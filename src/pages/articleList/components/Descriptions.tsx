import styles from './Descriptions.module.scss';

const Descriptions = () => {
  return (
    <div className={styles.contents}>
      <h2 className={styles.title}>소근소근</h2>
      <p className={styles.subtitle}>
        하고 싶은 이야기, 고민, 궁금한 모든 것들을 <br /> 패스트캠퍼스 수강생들과 함께 나눠봐요!
      </p>
    </div>
  );
};

export default Descriptions;
