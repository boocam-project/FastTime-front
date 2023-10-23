import { instance } from '@/api/client';
import styles from './adminBoard.module.scss';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/store';

interface FetchAdminBoardType {
  id: number;
  title: string;
  nickname: string;
  anonymity: boolean;
  commentCounts: number;
  likeCount: number;
  hateCount: number;
  createdAt: string;
  lastModifiedAt: string;
  length: number;
}

const fetchAdminBoardList = async (pageNum: number) => {
  const response = await instance.get(`/api/v1/admin?page=${pageNum}`);
  const result = await response.data;
  return result.data;
};

const AdminBoard = () => {
  const { data, isLoading } = useQuery<FetchAdminBoardType[]>({
    queryKey: ['adminBoard'],
    queryFn: () => fetchAdminBoardList(0),
    refetchOnWindowFocus: false,
  });

  const adminData = useRecoilValue(userState);
  console.log(adminData);

  const navigation = useNavigate();

  const handleDetailPage = (id: number) => {
    navigation(`/admin/detail/${id}`);
  };

  if (isLoading) return <div>Loading..</div>;
  return (
    <div className={styles.container}>
      <h4>안녕하세요 {adminData.nickname} 님</h4>
      <div className={styles.article}>
        <h3>신고 게시물 목록</h3>
        {data && data.length > 0 ? (
          <div className={styles['board-list-box']}>
            {data.map((item: FetchAdminBoardType) => (
              <li key={item.id} onClick={() => handleDetailPage(item.id)} className="detail-box">
                <span>{item.title}</span>
              </li>
            ))}
          </div>
        ) : (
          <div>신고 게시물이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default AdminBoard;
