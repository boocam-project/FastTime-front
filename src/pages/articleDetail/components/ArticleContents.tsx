import parser from 'html-react-parser';
import { useGetArticleById } from '../hooks/useGetArticle';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/atoms/button/Button';
import styles from '../index.module.scss';
import { formatTime } from '../utils';
import { instance } from '@/api/client';
import { AxiosError } from 'axios';

const ArticleContents = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const { data: article } = useGetArticleById();

  const content = parser(article?.content || '');

  const handleDelete = async () => {
    try {
      const response = await instance.delete(`api/v1/post`, {
        data: {
          postId: postId,
          memberId: 1,
        },
      });
      console.log(response.data);

      navigate('/community');
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  };

  return (
    <>
      <h1>{article.title}</h1>
      <div className={styles.info}>
        <div>
          <span className={styles.name}>{article.isAnonymity ? '익명' : article.nickname}</span>
          <span className={styles.date}>{formatTime(article.createdAt)}</span>
        </div>

        <div className={styles.btns}>
          <Button variant="secondary">
            <Link to={`/edit/${article.id}`}>수정</Link>
          </Button>
          <Button variant="secondary" onClick={handleDelete}>
            삭제
          </Button>
        </div>
      </div>
      <div>{content}</div>
    </>
  );
};

export default ArticleContents;
