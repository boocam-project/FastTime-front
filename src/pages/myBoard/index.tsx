import { useQuery } from '@tanstack/react-query';
import styles from './myBoard.module.scss';
import { useRecoilValue } from 'recoil';
import { instance } from '@/api/client';
import { userState } from '@/store/store';

const fetchPostData = async (nickname: string) => {
  try {
    const response = await instance.get(`api/v1/post?nickname=${nickname}`);
    const result = response.data;
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

type BoardType = {
  anonymity: boolean;
  content: string;
  createdAt: string;
  hateCount: number;
  id: number;
  lastModifiedAt: string;
  likeCount: number;
  nickname: string;
  title: string;
};

const Myboard = () => {
  const userData = useRecoilValue(userState);
  const { isLoading, isError, data, error } = useQuery<BoardType[], Error>({
    queryKey: ['myboard'],
    queryFn: () => fetchPostData(userData.nickname),
    staleTime: 3 * 1000 * 60,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className={styles.container}>
      <h3>내가 쓴글</h3>
      <div className={styles.boardListContainer}>
        {data?.map((item) => (
          <li key={item.id}>
            <div className={styles.titleText}>{item.title}</div>
            <div className={styles.writeDataText}>
              <span>{item.createdAt}</span>
              <p>hit</p>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Myboard;
