import { removeTokens } from './getToken';

export const signOut = () => {
  return new Promise((res) => {
    setTimeout(() => {
      removeTokens();
      res(true);
    }, 1000);
  });
};
