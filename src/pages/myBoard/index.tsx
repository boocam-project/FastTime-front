import { useQuery } from '@tanstack/react-query';
import styles from './myBoard.module.scss';
import { useRecoilValue } from 'recoil';
import { instance } from '@/api/client';
import { userState } from '@/store/store';
import { useState } from 'react';

type ClickHandleType = 'MORE' | 'RESET';

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

const fetchPostData = async (nickname: string) => {
  try {
    const response = await instance.get(`api/v1/post?nickname=${nickname}`);
    const result = response.data;
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const Myboard = () => {
  const userData = useRecoilValue(userState);
  const { isLoading, isError, data, error } = useQuery<BoardType[], Error>({
    queryKey: ['myboard'],
    queryFn: () => fetchPostData(userData.nickname),
    staleTime: 3 * 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const changeDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const [page, setPage] = useState(0);

  const clickHandleData = (type: ClickHandleType) => {
    if (data) {
      if (type === 'MORE' && page < data.length) {
        setPage((prev) => prev + 5);
      } else if (type === 'RESET') {
        setPage(5);
      } else {
        alert('게시글이 없습니다.');
      }
    }
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className={styles.container}>
      <h3>내가 쓴글</h3>
      <div className={styles['board-list-container']}>
        <div className={styles['board-btn-box']}>
          <span onClick={() => clickHandleData('MORE')}>더보기</span>
          <span onClick={() => clickHandleData('RESET')}>초기화</span>
        </div>
        {data?.map((item, index) => {
          if (index < page) {
            return (
              <li key={item.id}>
                <div className={styles['title-text']}>{item.title}</div>
                <div className={styles['write-data-text']}>
                  <span>{changeDate(item.createdAt)}</span>
                  <p>hit</p>
                </div>
              </li>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Myboard;
