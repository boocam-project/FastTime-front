import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import SignIn from '@/components/signIn';

import ArticleDetailPage from '@/pages/articleDetail';
import SignUp from '@/components/signUp';
import MyPage from '@/pages/myPage';
import ArticleListPage from '@/pages/articleList';
import AdminLogin from '@/pages/adminLogin';
import AdminBoardDetail from '@/pages/AdminBoardDetail';
import AdminBoard from '@/pages/adminBoard';
import CampReviewListPage from '@/pages/campReviewList';
import ReviewDetailListPage from '@/pages/reviewDetailList';
import { Suspense, lazy } from 'react';
import CreateStudy from '@/pages/studies/components/CreateStudy';
import StudiesPage from '@/pages/studies';
import StudyDetailPage from '@/pages/studies/detail';
import StudyApplicantsViewPage from '@/pages/studies/applicants';
import ResumePage from '@/pages/resume';
import ResumeDetail from '@/pages/resume/components/ResumeDetail';
import CreateResumePage from '@/pages/resume/new';

const WriteReviewPage = lazy(() => import('@/pages/writeReview'));

const WritePage = lazy(() => import('@/pages/editor/write'));
const EditPage = lazy(() => import('@/pages/editor/edit'));

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
        element: <ArticleDetailPage />,
      },
      {
        path: '/review',
        element: <CampReviewListPage />,
      },
      {
        path: '/review/detail',
        element: <ReviewDetailListPage />,
      },
      {
        path: '/review/write',
        element: (
          <Suspense>
            <WriteReviewPage />
          </Suspense>
        ),
      },
      { path: '/mypage', element: <MyPage /> },
      { path: '/admin/login', element: <AdminLogin /> },
      { path: '/admin/board', element: <AdminBoard /> },
      { path: '/admin/detail/:id', element: <AdminBoardDetail /> },
      { path: '/study', element: <StudiesPage /> },
      { path: '/study/new', element: <CreateStudy /> },
      { path: '/study/:id', element: <StudyDetailPage /> },
      { path: '/study/apply', element: <StudyApplicantsViewPage /> },
      { path: '/study/edit/:id', element: <CreateStudy /> },
      { path: '/resume', element: <ResumePage /> },
      { path: '/resume/:id', element: <ResumeDetail /> },
      { path: '/resume/new', element: <CreateResumePage /> },
    ],
  },
  {
    path: '/write',
    element: (
      <Suspense>
        <WritePage />
      </Suspense>
    ),
  },
  {
    path: '/edit/:id',
    element: (
      <Suspense>
        <EditPage />
      </Suspense>
    ),
  },
]);
