import { reviewFormState } from '@/recoil/reviewFormState';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styles from './SetRating.module.scss';

const SetRating = () => {
  const setReview = useSetRecoilState(reviewFormState);

  const [rating, setRating] = useState(5);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
    setReview((prev) => {
      return {
        ...prev,
        rating: Number(event.target.value),
      };
    });
  };

  const getReviewStar = (index: number) => {
    if (index === 1) {
      return rating >= 1 ? '/icons/starIcon.svg' : '/icons/starIconGray.svg';
    }
    if (index === 2) {
      return rating >= 2 ? '/icons/starIcon.svg' : '/icons/starIconGray.svg';
    }
    if (index === 3) {
      return rating >= 3 ? '/icons/starIcon.svg' : '/icons/starIconGray.svg';
    }
    if (index === 4) {
      return rating >= 4 ? '/icons/starIcon.svg' : '/icons/starIconGray.svg';
    }
    if (index === 5) {
      return rating >= 5 ? '/icons/starIcon.svg' : '/icons/starIconGray.svg';
    }
  };
  return (
    <div>
      <h3 className={styles.title}>별점을 선택해 주세요!</h3>
      <div className={styles.container}>
        <span className={styles.starRating}>
          {[...Array(5)].map((_, index) => {
            const value = (index + 1).toString();
            return (
              <label key={index}>
                <input type="radio" name="rating" value={value} onChange={handleChange} />
                <img src={getReviewStar(index + 1)} />
              </label>
            );
          })}
        </span>
      </div>
    </div>
  );
};

export default SetRating;
