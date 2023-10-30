import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

type UserStateType = {
  id: number;
  nickname: string;
  isLogin: boolean;
};
const { persistAtom } = recoilPersist();

export const userState = atom<UserStateType>({
  key: 'userState',
  default: {
    id: 0,
    nickname: '',
    isLogin: false,
  },
  effects_UNSTABLE: [persistAtom],
});
