import Button from '@/components/atoms/button/Button';
import styles from './StudyContent.module.scss';
import StudySubContent from './StudySubContent';
import { useGetStudy } from '../queries/useGetStudy';
import { useParams } from 'react-router-dom';

const StudyContent = () => {
  const params = useParams();
  const { data } = useGetStudy(parseInt(params.id!));

  return (
    <div className={styles.container}>
      <StudySubContent title="모집 기간">
        {data?.recruitmentStart} - {data?.recruitmentEnd}
      </StudySubContent>
      <StudySubContent title="진행 기간">
        {data?.progressStart} - {data?.progressEnd}
      </StudySubContent>
      <StudySubContent title="분야">
        {data?.categories.map((category) => <span key={category}>{category}</span>)}
      </StudySubContent>
      <StudySubContent title="기슬 스택">{data?.skill}</StudySubContent>
      <StudySubContent title="내용">{data?.content}</StudySubContent>

      <div className={styles.buttons}>
        <Button variant="default">{data?.applicant}명 지원</Button>
        <Button variant="default">
          {data?.current}/{data?.total} 모집 완료
        </Button>
        {/* TODO: 모달 형태로 지원, 전화번호 body에 담아야 하는지? */}
        <Button>지원하기</Button>
      </div>
    </div>
  );
};

export default StudyContent;
