import styles from './Article.module.scss';
import ArticleTitle from './ArticleTitle';
import UserInformation from './UserInformation';
import UserActions from './UserActions';
import ArticleMain from './ArticleMain';
import { Suspense } from 'react';

const ArticleArea = () => {
  return (
    <Suspense fallback={<p>Loading article...</p>}>
      <ArticleTitle />
      <div className={styles.users}>
        <UserInformation />
        <UserActions />
      </div>
      <ArticleMain />
    </Suspense>
  );
};

export default ArticleArea;
