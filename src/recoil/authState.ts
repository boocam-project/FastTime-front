import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export type Nullable<T> = T | null;

interface User {
  memberId: Nullable<number>;
  email: Nullable<string>;
  nickname: Nullable<string>;
  image: Nullable<string>;
  loggedIn: boolean;
}

const { persistAtom } = recoilPersist({
  key: 'bc-member',
  storage: sessionStorage,
});

export const authState = atom<User>({
  key: 'authState',
  default: {
    memberId: null,
    email: null,
    nickname: null,
    image: null,
    loggedIn: false,
  },
  effects_UNSTABLE: [persistAtom],
});
