import styles from './SelectTag.module.scss';
import ReviewTag from './ReviewTag';
import { goodTags, badTags } from '../constants';

export interface Tag {
  id: number;
  title: string;
  type: string;
  icon: string;
}

const SelectTag = () => {
  return (
    <div>
      <h3 className={styles.title}>태그를 선택해 주세요! (클릭)</h3>
      <div className={styles.tagListContainer}>
        <p className={styles.ListTitle}>좋음</p>
        <div className={styles.tagList}>
          {goodTags.map((tag: Tag) => {
            return (
              <ReviewTag key={tag.id} icon={tag.icon} text={tag.title} id={tag.id} type="good" />
            );
          })}
        </div>
      </div>
      <div className={styles.tagListContainer}>
        <p className={styles.ListTitle}>나쁨</p>
        <div className={styles.tagList}>
          {badTags.map((tag: Tag) => {
            return (
              <ReviewTag key={tag.id} icon={tag.icon} text={tag.title} id={tag.id} type="bad" />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectTag;
