import { atom } from 'recoil';

type EditorState = {
  content: string;
  summary: string;
  isAnonymity: boolean;
};

export const editorState = atom<EditorState>({
  key: 'editorState',
  default: {
    content: '',
    summary: '',
    isAnonymity: false,
  },
});
