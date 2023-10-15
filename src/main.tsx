import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.tsx';
import { RecoilRoot, atom } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { recoilPersist } from 'recoil-persist';

type UserStateType = {
  id: number;
  nickname: string;
};
const { persistAtom } = recoilPersist();

export const userState = atom<UserStateType>({
  key: 'userState',
  default: {
    id: 0,
    nickname: '',
  },
  effects_UNSTABLE: [persistAtom],
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
