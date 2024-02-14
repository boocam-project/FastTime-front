import styles from './BootcampList.module.scss';
import Button from '@/components/atoms/button/Button';

const BootcampList = () => {
  const list = ['42 Seoul', '우아한테크코스', '패스트캠퍼스'];

  return (
    <ul className={styles.listWrapContainer}>
      {list.map((v, i) => {
        return (
          <li key={i} className={styles.listContainer}>
            <div>{v}</div>
            <div>평점..</div>
            <div>리뷰 요약..</div>
            <Button variant="primary">자세히 보기</Button>
          </li>
        );
      })}
    </ul>
  );
};

export default BootcampList;
