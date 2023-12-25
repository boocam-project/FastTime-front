import './styles.scss';
import MenuBar from '@/pages/editor/components/editor/MenuBar';
import { useEditor, EditorContent } from '@tiptap/react';
import { extensions } from './extensions';
import { Article } from '@/pages/articleDetail/types';
import { useSetRecoilState } from 'recoil';
import { editorState } from './atoms/editor.atom';
import { getFirebaseUrlFromImage } from '../../utils/imageConvert';

interface DefaultEditorProps {
  article?: Article;
}

const DefaultEditor = ({ article }: DefaultEditorProps) => {
  const setClientEditor = useSetRecoilState(editorState);
  const content = article ? `<h1>${article.title}</h1> ${article.content}` : `<p></p>`;
  const editor = useEditor({
    extensions,
    content,
    // TODO: 이 로직을 어딘가로 옮겨야 함
    onUpdate: ({ editor }) => {
      setClientEditor((prev) => ({
        ...prev,
        content: editor.getHTML(),
        summary: editor.getText(),
      }));
    },
    editorProps: {
      handleDrop: (view, event, _slice, moved) => {
        const imageDrop = async (file: File) => {
          const fileSize = Number((file.size / 1024 / 1024).toFixed(4)); // MB
          if ((file.type === 'image/jpeg' || file.type === 'image/png') && fileSize < 10) {
            const url = await getFirebaseUrlFromImage(file);

            const { tr } = view.state;
            const imageNode = view.state.schema.nodes.image.create({ src: url });
            const transaction = tr.replaceSelectionWith(imageNode);
            view.dispatch(transaction);
          } else {
            alert('이미지는 jpeg, png 형식만 가능합니다. (10MB 이하)');
          }
        };
        if (!moved && event.dataTransfer?.files.length) {
          const file = event.dataTransfer.files[0];
          imageDrop(file);
          return true;
        }
        return false;
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="editor-main">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default DefaultEditor;
