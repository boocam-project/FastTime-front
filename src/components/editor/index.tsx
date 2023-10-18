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
import Title from './Title';

import useBlobUrl from '../../hooks/useBlobUrl';
import { createBlob, uploadImageToFirebase } from '../../hooks/useImageConvert';
import Button from '@/components/atoms/button';
import { instance } from '@/api/client';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

interface Props {
  oldContent?: string;
  oldTitle?: string;
  mode?: 'edit' | 'write';
  postId?: number;
}

const TextEditor = ({ oldContent, oldTitle, mode, postId }: Props) => {
  const { createBlobUrl } = useBlobUrl();
  const user = useRecoilValue(userState);
  const [anonymity, setAnonymity] = useState(false);
  const navigate = useNavigate();

  const content = oldContent ? `<h1>${oldTitle}</h1> ${oldContent}` : `<p></p>`;

  const editor = useEditor({
    extensions,
    content,
    // TODO: 이 로직을 어딘가로 옮겨야 함
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
    editorProps: {
      handleDrop: (view, event, _slice, moved) => {
        if (!moved && event.dataTransfer?.files.length) {
          const file = event.dataTransfer.files[0];
          const fileSize = Number((file.size / 1024 / 1024).toFixed(4)); // MB
          if ((file.type === 'image/jpeg' || file.type === 'image/png') && fileSize < 10) {
            const blobUrl = createBlobUrl(file);
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
    if (!editor) return;

    // const articleJSON = editor.getJSON();
    const articleHTML = editor.getHTML();

    if (!articleHTML) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(articleHTML, 'text/html');
    const images = doc.querySelectorAll('img');

    const uploadImageAndChangeURL = Array.from(images).map(async (image) => {
      const blobUrl = image.src;
      const blob = await createBlob(blobUrl);
      const downloadUrl = await uploadImageToFirebase(blob);

      image.src = downloadUrl;
    });

    await Promise.all(uploadImageAndChangeURL);

    const titleNode = doc.querySelector('h1');
    if (!titleNode || !titleNode.textContent) {
      alert('제목을 입력해주세요');
      return;
    }

    titleNode.remove();

    const updatedHTML = doc.body.innerHTML;

    const article =
      mode === 'edit'
        ? {
            postId,
            memberId: user.id,
            title: titleNode.textContent,
            content: updatedHTML,
          }
        : {
            memberId: user.id,
            title: titleNode.textContent,
            content: updatedHTML,
            anonymity: anonymity,
          };

    console.log(article);

    if (mode === 'write') {
      const response = await instance.post('/api/v1/post', article);
      console.log(response.data);
    } else {
      const response = await instance.patch('/api/v1/post', article);
      console.log(response.data);
    }
  };

  const handleCancel = () => {
    if (mode === 'edit') {
      navigate(`/community/${postId}`);
    } else {
      navigate('/community');
    }
  };

  return (
    <div className="editor-container">
      {editor && (
        <div className="editor-main">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      )}
      <div className="editor-footer">
        <input
          type="checkbox"
          name="anonymity"
          id="anonymity"
          checked={anonymity}
          onChange={(e) => {
            setAnonymity(e.currentTarget.checked);
          }}
        />
        <label htmlFor="anonymity">익명</label>
        <Button type="button" className="conpact-red-200" show onClick={handleCancel}>
          취소
        </Button>
        <Button type="button" className="conpact-red-200" show onClick={handlePublish}>
          {mode === 'write' ? '발행' : '수정'}
        </Button>
      </div>
    </div>
  );
};

export default TextEditor;
