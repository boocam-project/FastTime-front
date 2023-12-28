import Button from '@/components/atoms/button/Button';
import { useRecoilState } from 'recoil';
import { editorState } from './editor/atoms/editor.atom';

interface EditorActionProps {
  type: '발행' | '수정';
  onSubmit: () => void;
  onCancel: () => void;
}

const EditorActions = ({ type, onSubmit, onCancel }: EditorActionProps) => {
  const [editor, setEditor] = useRecoilState(editorState);

  return (
    <div className="editor-footer">
      <input
        type="checkbox"
        name="anonymity"
        id="anonymity"
        checked={editor.isAnonymity}
        onChange={(e) => {
          setEditor({ ...editor, isAnonymity: e.target.checked });
        }}
      />
      <label htmlFor="anonymity">익명</label>
      <Button variant="primary" onClick={onSubmit}>
        {type}
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        취소
      </Button>
    </div>
  );
};

export default EditorActions;
