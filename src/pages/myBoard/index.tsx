import { useQuery } from 'react-query';
import styles from './myBoard.module.scss';
const fetchData = async () => {
  const response = await fetch(`data/board.json`);
  const result = await response.json();
  return result.data;
};

type BoardType = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  anonymity: boolean;
  commentCount: number;
  likeCount: number;
  hateCount: number;
};

const Myboard = () => {
  const { isLoading, isError, data, error } = useQuery<BoardType[], Error>({
    queryKey: ['myboard'],
    queryFn: fetchData,
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
