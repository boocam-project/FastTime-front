import useReviewDetailData from '@/hooks/reviewData/query/useReviewDetailData';
import useInView from '@/hooks/useInview';
import { useEffect } from 'react';
import styles from './ReviewList.module.scss';

const ReviewList = ({ bootcampTitle }: { bootcampTitle: string }) => {
  const {
    data: reviewDetail,
    fetchNextPage,
    hasNextPage,
  } = useReviewDetailData({
    sortBy: 'createdAt',
    bootcamp: bootcampTitle as string,
  });

  const [ref, inView] = useInView({
    rootMargin: '100px',
  });

  // Fetch the next page when the bottom of the list comes into view
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  console.log(reviewDetail);

  return (
    <div className={styles.Container}>
      <ul className={styles.ListWrap}>
        {reviewDetail?.pages.map((page) =>
          page.reviews.map((review) => (
            <li className={styles.List} key={review.id}>
              <div>
                <span className={styles.campName}>{review.bootcamp}</span>
                <span>{new Array(review.rating).fill('⭐')}</span>
              </div>
              <div>제목 : {review.title}</div>
              <div className={styles.tagContainer}>
                <div>
                  <div className={styles.tagTitle}>좋았던 점</div>
                  <div className={styles.tagList}>
                    {review.goodtags.map((tag, index) => (
                      <div key={index}># {tag}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className={styles.tagTitle}>아쉬웠던 점</div>
                  <div className={styles.tagList}>
                    {review.badtags.map((tag, index) => (
                      <div key={index}># {tag}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.content}>{review.content}</div>
            </li>
          ))
        )}
      </ul>
      <div ref={ref} className={styles.InViewTrigger} />
    </div>
  );
};

export default ReviewList;
