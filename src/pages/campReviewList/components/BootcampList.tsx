import Button from '@/components/atoms/button/Button';
import { currentReviewState } from '@/recoil/currentReviewState';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styles from './BootcampList.module.scss';
// import useSummaryData from '@/hooks/reviewData/query/useSummaryData';
// import { useState } from 'react';

const BootcampList = () => {
  // const [reviewQuery, setReviewQuery] = useState({
  //   page: 1,
  //   size: 6,
  // });
  // const { data: summary } = useSummaryData(reviewQuery);

  const setRating = useSetRecoilState(currentReviewState);

  // console.log(summary);

  const navigate = useNavigate();
  const list = [
    {
      bootcamp: '42 Seoul',
      averageRating: 4.2,
      totalReviews: 20,
    },
    {
      bootcamp: '우아한테크코스',
      averageRating: 4.0,
      totalReviews: 100,
    },
    {
      bootcamp: '패스트캠퍼스',
      averageRating: 1.2,
      totalReviews: 1,
    },
  ];

  const handleClick = (name: string, rating: number, total: number) => {
    setRating({ averageRating: rating, totalReviews: total });
    navigate(`/review/detail?n=${name}`);
  };

  return (
    <div className={styles.Container}>
      <ul className={styles.listWrapContainer}>
        {list.map((bootcamp, index) => {
          return (
            <li key={index} className={styles.listContainer}>
              <div className={styles.title}>
                <div>{bootcamp.bootcamp}</div>
              </div>
              <div className={styles.description}>
                <div className={styles.rating}>⭐ {bootcamp.averageRating.toFixed(1)}</div>
                <div className={styles.totalReviews}>리뷰 {bootcamp.totalReviews}개</div>
                <Button
                  variant="primary"
                  onClick={() =>
                    handleClick(bootcamp.bootcamp, bootcamp.averageRating, bootcamp.totalReviews)
                  }
                >
                  리뷰 상세 보기
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BootcampList;
