import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

type UserStateType = {
  id: number;
  nickname: string;
  login: boolean;
};
const { persistAtom } = recoilPersist();

export const userState = atom<UserStateType>({
  key: 'userState',
  default: {
    id: 0,
    nickname: '',
    login: false,
  },
  effects_UNSTABLE: [persistAtom],
});
