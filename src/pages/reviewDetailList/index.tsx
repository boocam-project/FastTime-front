import { currentReviewState } from '@/recoil/currentReviewState';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ReviewList from './ReviewList';
import styles from './index.module.scss';

const ReviewDetailListPage = () => {
  const review = useRecoilValue(currentReviewState);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bootcampTitle = queryParams.get('n');

  const [moreView, setMoreView] = useState(false);

  const [viewButton, setViewButtin] = useState(false);

  const tagWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tagWrapRef.current) return;

    const height = tagWrapRef.current.offsetHeight;

    if (height >= 170) {
      setViewButtin(true);
    }
  }, [tagWrapRef]);

  const handleClickMoreView = () => {
    if (!tagWrapRef.current) return;

    if (moreView) {
      tagWrapRef.current.style.maxHeight = '170px';
      setMoreView(false);
    } else {
      tagWrapRef.current.style.maxHeight = 'none';
      setMoreView(true);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>{bootcampTitle}</h1>
      <div className={styles.rating}>
        <span>⭐{review.averageRating?.toFixed(1)}</span>
        <span>{review.totalReviews}개</span>
      </div>
      <div className={styles.tagWrapContainer} ref={tagWrapRef}>
        <div className={styles.tagWrap}>
          <div className={styles.goodTag}>
            <div style={{ width: '60%', backgroundColor: 'rgba(255, 240, 109, 1)' }} />
            <div>1</div>
          </div>
          <div className={styles.goodTag}>
            <div style={{ width: '30%', backgroundColor: 'rgba(255, 240, 109, 0.6)' }} />
            <div>2</div>
          </div>
          <div className={styles.bedTag}>
            <div style={{ width: '5%', backgroundColor: 'rgba(255, 240, 109, 0.4)' }} />
            <div>3</div>
          </div>
          <div className={styles.bedTag}>
            <div style={{ width: '3%', backgroundColor: 'rgba(255, 240, 109, 0.2)' }} />
            <div>4</div>
          </div>
          <div className={styles.bedTag}>
            <div style={{ width: '2%', backgroundColor: 'rgba(255, 240, 109, 0.2)' }} />
            <div>5</div>
          </div>
        </div>
        {viewButton && (
          <>
            {moreView ? (
              <div className={styles.hideButtonWrap}>
                <button onClick={handleClickMoreView}>접기</button>
              </div>
            ) : (
              <div className={styles.moreButtonWrap}>
                <button onClick={handleClickMoreView}>더보기</button>
              </div>
            )}
          </>
        )}
      </div>
      <ReviewList />
    </div>
  );
};

export default ReviewDetailListPage;
