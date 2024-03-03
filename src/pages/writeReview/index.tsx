import Button from '@/components/atoms/button/Button';
import Input from '@/components/atoms/input';
import { reviewFormState } from '@/recoil/reviewFormState';
import { useRecoilValue } from 'recoil';
import SelectTag from './components/SelectTag';
import SetRating from './components/SetRating';
import styles from './index.module.scss';

import { ReactComponent as PenSquare } from '@/assets/icons/pen_square.svg';
import { useState } from 'react';

export interface Tag {
  id: number;
  title: string;
  type: string;
  icon: string;
}

const WriteReviewPage = () => {
  const review = useRecoilValue(reviewFormState);
  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');

  const handleSubmit = () => {
    const data = {
      title: titleInput,
      goodTags: review.goodTags,
      badTags: review.badTags,
      rating: review.rating,
      content: contentInput,
    };

    console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <h2 className={styles.title}>리뷰 작성</h2>
        <p className={styles.subtitle}>패스트 캠퍼스</p>
      </div>
      <SelectTag />
      <div className={styles.textInputContainer}>
        <Input
          label="제목"
          name="review-title"
          onChange={(e) => {
            setTitleInput(e.target.value);
          }}
        />
        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          className={styles.textarea}
          onChange={(e) => {
            setContentInput(e.target.value);
          }}
        />
      </div>
      <SetRating />
      <div className={styles.buttonContainer}>
        <Button variant="primary" onClick={handleSubmit}>
          <PenSquare />
          <span>리뷰 등록하기</span>
        </Button>
      </div>
    </div>
  );
};

export default WriteReviewPage;
