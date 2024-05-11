import SignIn from '@/components/signIn';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

import SignUp from '@/components/signUp';
import AdminBoardDetail from '@/pages/AdminBoardDetail';
import ActivityPage from '@/pages/activity';
import ActivityDetailPage from '@/pages/activityDetail';
import AdminBoard from '@/pages/adminBoard';
import AdminLogin from '@/pages/adminLogin';
import ArticleDetailPage from '@/pages/articleDetail';
import ArticleListPage from '@/pages/articleList';
import CampReviewListPage from '@/pages/campReviewList';
import MyPage from '@/pages/myPage';
import ReviewDetailListPage from '@/pages/reviewDetailList';
import { Suspense, lazy } from 'react';
import CreateStudy from '@/pages/studies/components/CreateStudy';
import StudiesPage from '@/pages/studies';
import StudyDetailPage from '@/pages/studies/detail';
import StudyApplicantsViewPage from '@/pages/studies/applicants';
import ResumePage from '@/pages/resume';
import ResumeDetailPage from '@/pages/resume/components/ResumeDetail';
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
      { path: '/activity', element: <ActivityPage /> },
      { path: '/activity/:id', element: <ActivityDetailPage /> },
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
      { path: '/resume/:id', element: <ResumeDetailPage /> },
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
