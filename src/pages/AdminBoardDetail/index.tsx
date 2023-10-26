import { instance } from '@/api/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import styles from './adminBoardDetail.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { formatTime } from '@/components/community/changeTimeFormat';
import Button from '@/components/atoms/button';
import ArticleSkeletons from '@/components/community/ArticleSkeletons';

type Theme = 'LIST' | 'DELETE' | 'RESTORE';

interface MutateResultType {
  code: number;
  data: null;
  message: string;
}

const fetchAdminDeleteData = async (id: string) => {
  const response = await instance.get(`/api/v1/admin/${id}/delete`);
  return response;
};
const fetchAdminRestoreData = async (id: string) => {
  const response = await instance.get(`/api/v1/admin/${id}/pass`);
  return response;
};

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

  const DELETEMutation = useMutation({
    mutationFn: (id: string) => fetchAdminDeleteData(id),
    onSuccess({ data }: { data: MutateResultType }) {
      alert(data.message);
      navigation('/admin/board');
    },
  });
  const RESTOREMutation = useMutation({
    mutationFn: (id: string) => fetchAdminRestoreData(id),
    onSuccess({ data }: { data: MutateResultType }) {
      alert(data.message);
      navigation('/admin/board');
    },
  });

  const navigation = useNavigate();

  const handleClickEvent = (type: Theme) => {
    switch (type) {
      case 'LIST':
        navigation('/admin/board');
        break;
      case 'DELETE':
        if (id) {
          DELETEMutation.mutate(id);
        }
        break;
      case 'RESTORE':
        if (id) {
          RESTOREMutation.mutate(id);
        }
        break;
      default:
        alert('error 발생');
        break;
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
              onClick={() => handleClickEvent('DELETE')}
            >
              삭제
            </Button>
            <Button
              className="default-red-200"
              show={true}
              type="button"
              onClick={() => handleClickEvent('LIST')}
            >
              목록
            </Button>
            <Button
              className="default-red-200"
              show={true}
              type="button"
              onClick={() => handleClickEvent('RESTORE')}
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
