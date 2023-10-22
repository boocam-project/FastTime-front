import { instance } from '@/api/client';
import ArticleSkeletons from '@/components/community/articleSkeletons';
import { useQuery } from '@tanstack/react-query';
import styles from './adminBoardDetail.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { formatTime } from '@/components/community/changeTimeFormat';
import Button from '@/components/atoms/button';

const fetchAdminBoardDetail = async (id: string) => {
  const response = await instance.get(`/api/v1/admin/${id}`);
  const result = response.data;
  return result.data;
};

const AdminBoardDetail = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['adminBoardDetail'],
    queryFn: () => fetchAdminBoardDetail(id as string),
    refetchOnWindowFocus: false,
  });

  const navigation = useNavigate();

  const handleClickEvent = (type: string) => {
    if (type === 'list') {
      navigation('/admin/board');
    }
  };

  return (
    <div>
      {isLoading || !data ? (
        <ArticleSkeletons />
      ) : (
        <div className={styles.container}>
          <span className={styles.title}>{data.title}</span>
          <div className={styles['info-box']}>
            <span className={styles['info-nickname']}>{data.nickname}</span>
            <span className={styles['info-writeDate']}>{formatTime(data.createdAt)}</span>
          </div>
          <div className={styles['content-box']}>{data.content}</div>
          <div className={styles['button-box']}>
            <Button
              className="default-red-200"
              show={true}
              type="button"
              onClick={() => handleClickEvent('delete')}
            >
              삭제
            </Button>
            <Button
              className="default-red-200"
              show={true}
              type="button"
              onClick={() => handleClickEvent('list')}
            >
              목록
            </Button>
            <Button
              className="default-red-200"
              show={true}
              type="button"
              onClick={() => handleClickEvent('abort')}
            >
              복구
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBoardDetail;
