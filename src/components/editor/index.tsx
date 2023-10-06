import './styles.scss';

import { EditorContent, useEditor, textblockTypeInputRule } from '@tiptap/react';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import StarterKit from '@tiptap/starter-kit';

import MenuBar from './MenuBar';
import Button from '@components/atoms/button';
import Title from './Title';

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../libs/firebase';

const DocumentWithTitle = Document.extend({
  content: 'title block+',
});

const adjustLevel = (level: any) => (level == 1 ? 2 : level);
const CustomHeading = Heading.extend({
  parseHTML() {
    return this.options.levels.map((level) => ({
      tag: `h${level}`,
      attrs: { level: adjustLevel(level) },
    }));
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce(
      (items, level) => ({
        ...items,
        ...{
          [`Mod-Alt-${level}`]: () =>
            this.editor.commands.toggleHeading({
              level: adjustLevel(level),
            }),
        },
      }),
      {}
    );
  },
  addInputRules() {
    return this.options.levels.map((level) => {
      return textblockTypeInputRule({
        find: new RegExp(`^(#{1,${level}})\\s$`),
        type: this.type,
        getAttributes: {
          level: adjustLevel(level),
        },
      });
    });
  },
});

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as any),
  StarterKit.configure({
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    document: false,
    heading: false,
  }),
  Placeholder.configure({
    showOnlyCurrent: false,
    placeholder: ({ node }) => {
      if (node.type.name === 'title') return '제목을 입력하세요';
      return '내용을 입력하세요';
    },
  }),
  DocumentWithTitle,
  Title,
  CustomHeading,
  Underline,
  Image,
];

const content = `
<p>
</p>
`;

const TextEditor = () => {
  const editor = useEditor({
    extensions,
    content,
    // TODO: 이 로직을 어딘가로 옮겨야 함
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
    editorProps: {
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files.length) {
          const file = event.dataTransfer.files[0];
          const fileSize = Number((file.size / 1024 / 1024).toFixed(4)); // MB
          if ((file.type === 'image/jpeg' || file.type === 'image/png') && fileSize < 10) {
            console.log(file);
            const blobUrl = URL.createObjectURL(file);

            // Insert the blob URL as an image into the editor
            const { tr } = view.state;
            const imageNode = view.state.schema.nodes.image.create({ src: blobUrl });
            const transaction = tr.replaceSelectionWith(imageNode);
            view.dispatch(transaction);
          } else {
            alert('이미지는 jpeg, png 형식만 가능합니다. (10MB 이하)');
          }
          return true;
        }
        return false;
      },
    },
  });

  // TODO: 세부적으로 추상화 할 것
  const handlePublish = async () => {
    if (!editor) {
      console.log('editor is null');
      return;
    }

    console.log(editor.getHTML());

    const editorHTML = editor.getHTML();
    const parser = new DOMParser();
    const originalDoc = parser.parseFromString(editorHTML, 'text/html');
    const images = originalDoc.querySelectorAll('img');
    let updatedHTML = '';

    images.forEach(async (image) => {
      const src = image.getAttribute('src');
      if (src?.startsWith('blob')) {
        const response = await fetch(src);
        const blob = await response.blob();

        const storageRef = ref(storage, `images/${new Date().getTime()}_${blob.type}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);

        image.setAttribute('src', downloadURL);
        updatedHTML = originalDoc.body.innerHTML;
        console.log(updatedHTML);
      }
    });
  };

  return (
    <div className="editor-wrapper">
      {editor && (
        <>
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </>
      )}
      <div className="editor-footer">
        <Button className="default" show>
          취소
        </Button>
        <button onClick={handlePublish}>발행</button>
      </div>
    </div>
  );
};

export default TextEditor;
