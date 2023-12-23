import styles from './Article.module.scss';
import ArticleTitle from './ArticleTitle';
import UserInformation from './UserInformation';
import UserActions from './UserActions';
import { Suspense } from 'react';
import ArticleMain from './ArticleMain';

const Article = () => {
  return (
    <Suspense>
      <ArticleTitle />
      <div className={styles.users}>
        <UserInformation />
        <UserActions />
      </div>
      <ArticleMain />
    </Suspense>
  );
};

export default Article;
