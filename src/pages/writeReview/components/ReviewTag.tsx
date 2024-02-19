import { useState } from 'react';
import styles from './ReviewTag.module.scss';
import { useRecoilState } from 'recoil';
import { reviewFormState } from '@/recoil/reviewFormState';

interface Props {
  icon: string;
  text: string;
  type: string;
  id: number;
}

const ReviewTag = ({ icon, text, type, id }: Props) => {
  const [_, setReview] = useRecoilState(reviewFormState);
  const [isClicked, setIsClicked] = useState(false);

  const getBackground = () => {
    if (type === 'good') {
      return isClicked ? '#ffa0a08e' : '#ffc3c349';
    } else {
      return isClicked ? '#9b9bffc2' : '#b7b7fd67';
    }
  };

  const handleClick = () => {
    setIsClicked((prev) => !prev);
    setReview((prev) => {
      if (type === 'good') {
        return {
          ...prev,
          goodTags: isClicked
            ? prev.goodTags.filter((tagId) => tagId !== id)
            : [...prev.goodTags, id],
        };
      } else {
        return {
          ...prev,
          badTags: isClicked ? prev.badTags.filter((tagId) => tagId !== id) : [...prev.badTags, id],
        };
      }
    });
  };

  return (
    <button
      className={styles.tagContainer}
      style={{ backgroundColor: getBackground() }}
      onClick={handleClick}
    >
      <div>{icon}</div>
      <div>{text}</div>
      <div className={styles.grow}></div>
      {isClicked && <div>✅</div>}
    </button>
  );
};

export default ReviewTag;
