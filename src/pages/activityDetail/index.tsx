import Divider from '@/components/atoms/Divider';
import useActivitiyData from '@/hooks/activitiesData/query/useActivityData';
import useCompetitionData from '@/hooks/competitionsData/query/useCompetitionData';
import { useLocation, useParams } from 'react-router-dom';
import styles from './index.module.scss';

const ActivityDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabName = queryParams.get('t');
  const { data: competition } = useCompetitionData({
    id: Number(id),
    start: tabName === 'competitions',
  });
  const { data: activitiy } = useActivitiyData({
    id: Number(id),
    start: tabName === 'activities',
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {tabName === 'competitions' ? competition?.title : activitiy?.title}
      </div>
      <Divider size="sm" space={15} />
      <div className={styles.infoWrap}>
        <div>
          기본
          <br />
          정보
        </div>
        <div>
          <div>
            <span>{tabName === 'competitions' ? '공모전 주최' : '대외 활동 주최'}</span>
            <span>
              {tabName === 'competitions'
                ? competition?.organization || ''
                : activitiy?.organization}
            </span>
          </div>
          <div>
            <span>기업 형태</span>
            <span>
              {tabName === 'competitions'
                ? competition?.corporateType || ''
                : activitiy?.corporateType}
            </span>
          </div>
          <div>
            <span>참여 대상</span>
            <span>
              {tabName === 'competitions' ? competition?.participate || '' : activitiy?.participate}
            </span>
          </div>
          <div>
            <span>접수 기간</span>
            <span>
              {tabName === 'competitions'
                ? `${competition?.startDate || ''} ~ ${competition?.endDate || ''}` || ''
                : `${activitiy?.startDate || ''} ~ ${activitiy?.endDate || ''}`}
            </span>
          </div>

          {tabName === 'activities' && (
            <div>
              <span>활동 기간</span>
              <span>{activitiy?.period}</span>
            </div>
          )}
          {tabName === 'activities' && (
            <div>
              <span>모집 인원</span>
              <span>{activitiy?.recruitment}명</span>
            </div>
          )}
        </div>
        <div>
          {tabName === 'competitions' && (
            <div>
              <span>시상 규모</span>
              <span>{competition?.activityBenefit || ''}</span>
            </div>
          )}

          {tabName === 'activities' && (
            <div>
              <span>활동 지역</span>
              <span>{activitiy?.area}</span>
            </div>
          )}
          {tabName === 'activities' && (
            <div>
              <span>우대 역량</span>
              <span>{activitiy?.preferredSkills}</span>
            </div>
          )}
          {tabName === 'activities' && (
            <div>
              <span>활동 분야</span>
              <span>{activitiy?.activityField}</span>
            </div>
          )}

          <div>
            <span>활동 혜택</span>
            <span>
              {tabName === 'competitions'
                ? competition?.activityBenefit || ''
                : activitiy?.activityBenefit}
            </span>
          </div>
          <div>
            <span>추가 혜택</span>
            <span>
              {tabName === 'competitions'
                ? competition?.bonusBenefit || ''
                : activitiy?.bonusBenefit}
            </span>
          </div>
          <div>
            <span>홈페이지 URL</span>
            <span>
              <a
                href={
                  tabName === 'competitions' ? competition?.homepageUrl : activitiy?.homepageUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles.detailLink}
              >
                {tabName === 'competitions'
                  ? competition?.homepageUrl.split('?')[0] || competition?.homepageUrl || ''
                  : activitiy?.homepageUrl.split('?')[0] || activitiy?.homepageUrl || ''}
              </a>
            </span>
          </div>
        </div>
      </div>
      <Divider size="sm" space={15} />
      <div className={styles.content}>
        <img
          src={tabName === 'competitions' ? competition?.imageUrl : activitiy?.imageUrl}
          alt="detail"
        />
        <div>{tabName === 'competitions' ? competition?.description : activitiy?.description}</div>
      </div>
    </div>
  );
};

export default ActivityDetailPage;
