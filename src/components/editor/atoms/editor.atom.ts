import { atom } from 'recoil';

type EditorState = {
  content: string;
  summary: string;
};

export const editorState = atom<EditorState>({
  key: 'editorState',
  default: {
    content: '',
    summary: '',
  },
});
