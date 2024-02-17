import styles from './BootcampList.module.scss';
import Button from '@/components/atoms/button/Button';

const BootcampList = () => {
  const list = [
    {
      id: 0,
      title: '42 Seoul',
      subTitle: '소프트웨어 개발',
      score: 4.2,
      type: 'etc',
    },
    {
      id: 1,
      title: '우아한테크코스',
      subTitle: '웹 백엔드',
      score: 4.0,
      type: 'back',
    },
    {
      id: 2,
      title: '패스트캠퍼스',
      subTitle: '프론트엔드 개발 부트캠프',
      score: 1.2,
      type: 'front',
    },
  ];

  const getImage = (type: string) => {
    if (type === 'front') return '/images/front.png';
    if (type === 'back') return '/images/back.png';
    if (type === 'ai') return '/images/ai.png';

    return '/images/data.png';
  };

  return (
    <ul className={styles.listWrapContainer}>
      {list.map((v) => {
        return (
          <li key={v.id} className={styles.listContainer}>
            <div className={styles.imgWrapper}>
              <div className={styles.imgTextBox}>{v.title}</div>
              <img src={getImage(v.type)} />
            </div>
            <div className={styles.title}>
              <div>{v.title}</div>
              <div>⭐ {v.score.toFixed(1)}</div>
            </div>
            <div className={styles.subTitle}>{v.subTitle}</div>
            <Button variant="primary">리뷰 상세 보기</Button>
          </li>
        );
      })}
    </ul>
  );
};

export default BootcampList;
