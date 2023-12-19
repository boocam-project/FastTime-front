import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import ArticleList from './components/ArticlesList';

const ArticleListPage = () => {
  return (
    <>
      <div className={styles.articleMenus}>
        <h2 style={{ fontWeight: 'normal' }}>게시글</h2>
        <Link to={'/write'}>
          <BsPencilSquare size={20} />
          <span>글쓰기</span>
        </Link>
      </div>
      {/* TODO: 에러 바운더리 추가 */}
      <Suspense fallback={<div>Loading...</div>}>
        <ArticleList />
      </Suspense>
    </>
  );
};

export default ArticleListPage;
