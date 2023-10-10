import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import SignIn from '@/components/signIn';
import Mypage from '@/pages/myPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <h1>Home</h1>,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      { path: '/mypage', element: <Mypage /> },
    ],
  },
]);
