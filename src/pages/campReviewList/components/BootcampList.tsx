import styles from './BootcampList.module.scss';
import Button from '@/components/atoms/button/Button';

const BootcampList = () => {
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

  const selectRandomImage = () => {
    const images = ['/images/ai.png', '/images/back.png', '/images/front.png'];

    const randomIndex = Math.floor(Math.random() * images.length);

    return images[randomIndex];
  };

  return (
    <div className={styles.Container}>
      <ul className={styles.listWrapContainer}>
        {list.map((bootcamp, index) => {
          return (
            <li key={index} className={styles.listContainer}>
              <div className={styles.imgWrapper}>
                <div className={styles.imgTextBox}>{bootcamp.bootcamp}</div>
                <img src={selectRandomImage()} />
              </div>
              <div className={styles.title}>
                <div>⭐ {bootcamp.averageRating.toFixed(1)}</div>
                <div>총 리뷰: {bootcamp.totalReviews}개</div>
              </div>
              <Button variant="primary">리뷰 상세 보기</Button>
            </li>
            // <li>
            //   <div>{bootcamp.bootcamp}</div>
            //   <div>{bootcamp.totalReviews}</div>
            //   <div>{bootcamp.averageRating.toFixed(1)}</div>
            // </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BootcampList;
