import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import SignIn from '@/components/signIn';

import ArticleDetail from '@/components/community/ArticleDetail';
import TextEditor from '@/components/editor';
import SignUp from '@/components/signUp';
import MyPage from '@/pages/myPage';
import ArticleList from '@/components/community/ArticleList';
import EditArticle from '@/components/editor/EditArticle';
import AdminLogin from '@/pages/adminLogin';
import AdminBoardDetail from '@/pages/AdminBoardDetail';
import AdminBoard from '@/pages/adminBoard';
import Main from '@/pages/main';
import Contest from '@/pages/contest';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Main />,
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
        path: '/contest',
        element: <Contest />,
      },
      {
        path: '/community',
        element: <ArticleList />,
      },
      {
        path: '/community/:id',
        element: <ArticleDetail />,
      },
      {
        path: '/mypage',
        element: <MyPage />,
      },
      {
        path: '/admin/login',
        element: <AdminLogin />,
      },
      {
        path: '/admin/board',
        element: <AdminBoard />,
      },
      {
        path: '/admin/detail/:id',
        element: <AdminBoardDetail />,
      },
    ],
  },

  {
    path: '/write',
    element: <TextEditor />,
  },
  {
    path: '/edit/:id',
    element: <EditArticle />,
  },
]);
