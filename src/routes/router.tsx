import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import SignIn from '@/components/signIn';

import ArticleDetail from '@/pages/articleDetail';
import SignUp from '@/components/signUp';
import MyPage from '@/pages/myPage';
import ArticleListPage from '@/pages/articleList';
import AdminLogin from '@/pages/adminLogin';
import AdminBoardDetail from '@/pages/AdminBoardDetail';
import AdminBoard from '@/pages/adminBoard';
import WritePage from '@/pages/editor/write';
import EditPage from '@/pages/editor/edit';

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
        element: <ArticleListPage />,
      },
      {
        path: '/community/:id',
        element: <ArticleDetail />,
      },
      { path: '/mypage', element: <MyPage /> },
      { path: '/admin/login', element: <AdminLogin /> },
      { path: '/admin/board', element: <AdminBoard /> },
      { path: '/admin/detail/:id', element: <AdminBoardDetail /> },
    ],
  },
  {
    path: '/write',
    element: <WritePage />,
  },
  {
    path: '/edit/:id',
    element: <EditPage />,
  },
]);
