import React from 'react';
import { useQuery } from 'react-query';
import styles from './myComents.module.scss';
const fetchData = async () => {
  const response = await fetch(`data/coments.json`);
  const results = await response.json();
  return results.data;
};

type ComentsType = {
  id: number;
  postId: number;
  memberId: number;
  content: string;
  anonymity: boolean;
  parentCommentId: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
};

const MyComenets = () => {
  const { isLoading, isError, data, error } = useQuery<ComentsType[], Error>({
    queryKey: ['my-comenets'],
    queryFn: fetchData,
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
