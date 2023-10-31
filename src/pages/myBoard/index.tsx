import { useQuery } from '@tanstack/react-query';
import styles from './myBoard.module.scss';
import { useRecoilValue } from 'recoil';
import { instance } from '@/api/client';
import { userState } from '@/store/store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const MyPosts = () => {
  const userData = useRecoilValue(userState);
  const navigation = useNavigate();
  const { isLoading, isError, data, error } = useQuery<BoardType[], Error>({
    queryKey: ['my-board'],
    queryFn: () => fetchPostData(userData.nickname),
    staleTime: 3 * 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const changeDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const [page, setPage] = useState(5);

  const clickHandleData = (type: ClickHandleType) => {
    if (data) {
      if (type === 'MORE' && data.length > page) {
        setPage((prev) => prev + 5);
      } else if (type === 'RESET') {
        setPage(5);
      } else {
        alert('가져올 게시글이 없습니다.');
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
        {data ? (
          data?.map((item, index) => {
            if (index < page) {
              return (
                <li key={item.id}>
                  <span
                    className={styles['title-text']}
                    onClick={() => navigation(`/community/${item.id}`)}
                  >
                    {item.title}
                  </span>
                  <div className={styles['write-data-text']}>
                    <span>{changeDate(item.createdAt)}</span>
                    <p>hit</p>
                  </div>
                </li>
              );
            }
          })
        ) : (
          <>작성한 게시글이 없습니다.</>
        )}
      </div>
      {data && (
        <div className={styles['board-btn-box']}>
          <span onClick={() => clickHandleData('MORE')}>더보기</span>
          <span onClick={() => clickHandleData('RESET')}>닫기</span>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
