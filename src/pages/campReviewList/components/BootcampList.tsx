import Button from '@/components/atoms/button/Button';
import useSummaryData from '@/hooks/reviewData/query/useSummaryData';
import { currentReviewState } from '@/recoil/currentReviewState';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styles from './BootcampList.module.scss';

const reviewQuery = {
  page: 1,
  size: 6,
};

const BootcampList = () => {
  const { data: summary, isError } = useSummaryData(reviewQuery);

  const setRating = useSetRecoilState(currentReviewState);

  const navigate = useNavigate();

  const handleClick = (name: string, rating: number, total: number) => {
    setRating({ averageRating: rating, totalReviews: total });
    navigate(`/review/detail?n=${name}`);
  };

  if (isError) return <div>잠시 후 다시 시도해주세요.</div>;
  if (!summary) return <div>등록 된 리뷰가 없습니다.</div>;

  return (
    <div className={styles.Container}>
      <ul className={styles.listWrapContainer}>
        {summary?.reviews.map((bootcamp, index) => {
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
