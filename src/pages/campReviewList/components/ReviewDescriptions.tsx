import styles from './ReviewDescriptions.module.scss';

const ReviewDescriptions = () => {
  return (
    <div className={styles.contents}>
      <h2 className={styles.title}>리뷰</h2>
      <p className={styles.subtitle}>
        여러분의 솔직한 경험과 평가를 공유해주세요. <br /> 여러분의 리뷰가 다른 사람들의 선택에
        도움을 줄 수 있습니다!
      </p>
    </div>
  );
};

export default ReviewDescriptions;
