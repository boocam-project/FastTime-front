import styles from './index.module.scss';
import { Suspense } from 'react';
import ArticleList from './components/ArticleList';
import ArticleSkeletons from './components/Skeleton';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import Descriptions from './components/Descriptions';
import ArticleMenus from './components/ArticleMenus';

const ArticleListPage = () => {
  return (
    <div className={styles.container}>
      <Descriptions />
      <ArticleMenus />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
            <Suspense fallback={<ArticleSkeletons />}>
              <ArticleList />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
};

export default ArticleListPage;
