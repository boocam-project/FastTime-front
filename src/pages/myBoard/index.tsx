import { useQuery } from '@tanstack/react-query';
import styles from './myBoard.module.scss';
import { useRecoilValue } from 'recoil';
import { instance } from '@/api/client';
import { userState } from '@/store/store';
import { useState } from 'react';

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

type BoardBtnType = 'MORE' | 'RESET';

const Myboard = () => {
  const userData = useRecoilValue(userState);
  const { isLoading, isError, data, error } = useQuery<BoardType[], Error>({
    queryKey: ['myboard'],
    queryFn: () => fetchPostData(userData.nickname),
    staleTime: 3 * 1000 * 60,
    refetchOnWindowFocus: false,
  });
  const [page, setPage] = useState(5);
  const changeDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const moreClickHandle = (type: BoardBtnType) => {
    if (data) {
      if (type === 'MORE' && page < data.length) {
        setPage((prev) => (prev += 5));
      } else if (type === 'RESET') {
        setPage(5);
      } else {
        alert('더 가져올 게시글이 없습니다.');
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
          <span onClick={() => moreClickHandle('MORE')}>더보기</span>
          <span onClick={() => moreClickHandle('RESET')}>초기화</span>
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
          } else {
            return;
          }
        })}
      </div>
    </div>
  );
};

export default Myboard;
