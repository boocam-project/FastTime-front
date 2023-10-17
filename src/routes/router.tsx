import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import SignIn from '@/components/signIn';

import ArticleDetail from '@/components/community/ArticleDetail';
import TextEditor from '@/components/editor';
import SignUp from '@/components/signUp';
import Mypage from '@/pages/myPage';
import ArticleList from '@/components/community/ArticleList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <SignIn />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/community',
        element: <ArticleList />,
      },
      {
        path: '/community/:id',
        element: <ArticleDetail />,
      },
      { path: '/mypage', element: <Mypage /> },
    ],
  },
  {
    path: '/write',
    element: <TextEditor />,
  },
]);
