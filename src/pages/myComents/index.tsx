import { useQuery } from '@tanstack/react-query';
import styles from './myComents.module.scss';
import { instance } from '@/api/client';
import { useState } from 'react';
const fetchCommentData = async () => {
  try {
    const response = await instance.get(`/api/v1/comment/my-page`);
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

type Theme = 'ADD' | 'RESET';

const MyComenets = () => {
  const { isLoading, isError, data, error } = useQuery<ComentsType[], Error>({
    queryKey: ['my-comenets'],
    queryFn: () => fetchCommentData(),
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const [page, setPage] = useState(5);

  const clickHandleData = (type: Theme) => {
    if (type === 'ADD') {
      if (data) {
        const dataSize = data?.length;
        if (page < dataSize) {
          setPage(page * 2);
        } else {
          alert('가져올 데이터가 없습니다.');
        }
      }
    }
    if (type === 'RESET') {
      setPage(5);
    }
  };

  if (isLoading) return <span> 로딩중 ...</span>;
  if (isError) return <span>{error.message}</span>;
  return (
    <div className={styles.container}>
      <div className={styles.article}>
        <h3>내가 쓴 댓글</h3>
        <span onClick={() => clickHandleData('ADD')}>더보기</span>
        <span onClick={() => clickHandleData('RESET')}>초기화</span>
      </div>
      <div className={styles.itemBox}>
        {data?.map((item, index) => {
          if (index < page) {
            return <li key={item.id}>{item.content}</li>;
          } else {
            return;
          }
        })}
      </div>
    </div>
  );
};

export default MyComenets;
