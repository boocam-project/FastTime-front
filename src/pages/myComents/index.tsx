import { useQuery } from '@tanstack/react-query';
import styles from './myComents.module.scss';
import { instance } from '@/api/client';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/store';
const fetchCommentData = async (userid: number) => {
  try {
    const response = await instance.get(`api/v1/comment/my-page/${userid}`);
    const result = response.data;
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

type ComentsType = {
  anonymity: boolean;
  content: string;
  createdAt: string;
  deletedAt: null;
  id: number;
  nickname: string;
  parentCommentId: null | number;
  postId: number;
  updatedAt: string;
};

const MyComenets = () => {
  const userData = useRecoilValue(userState);
  const { isLoading, isError, data, error } = useQuery<ComentsType[], Error>({
    queryKey: ['my-comenets'],
    queryFn: () => fetchCommentData(userData.id),
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <span> 로딩중 ...</span>;
  if (isError) return <span>{error.message}</span>;
  return (
    <div className={styles.container}>
      <h3>내가 쓴 댓글</h3>
      <div className={styles.itemBox}>
        {data?.map((item) => <li key={item.id}>{item.content}</li>)}
      </div>
    </div>
  );
};

export default MyComenets;
