import { useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import { itemADetail, itemBDetail } from '../activity/constants';
import Divider from '@/components/atoms/Divider';

const ActivityDetailPage = () => {
  // const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabName = queryParams.get('t');

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {tabName === 'competitions' ? itemADetail.data.title : itemBDetail.data.title}
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
                ? itemADetail.data.organization || ''
                : itemBDetail.data.organization}
            </span>
          </div>
          <div>
            <span>기업 형태</span>
            <span>
              {tabName === 'competitions'
                ? itemADetail.data.corporate_type || ''
                : itemBDetail.data.corporate_type}
            </span>
          </div>
          <div>
            <span>참여 대상</span>
            <span>
              {tabName === 'competitions'
                ? itemADetail.data.participate || ''
                : itemBDetail.data.participate}
            </span>
          </div>
          <div>
            <span>접수 기간</span>
            <span>
              {tabName === 'competitions'
                ? `${itemADetail.data.start_date || ''} ~ ${itemADetail.data.end_date || ''}` || ''
                : `${itemBDetail.data.start_date || ''} ~ ${itemBDetail.data.end_date || ''}`}
            </span>
          </div>

          {tabName === 'activities' && (
            <div>
              <span>활동 기간</span>
              <span>{itemBDetail.data.period}</span>
            </div>
          )}
          {tabName === 'activities' && (
            <div>
              <span>모집 인원</span>
              <span>{itemBDetail.data.recruitment}명</span>
            </div>
          )}
        </div>
        <div>
          {tabName === 'competitions' && (
            <div>
              <span>시상 규모</span>
              <span>{itemADetail.data.activity_benefit || ''}</span>
            </div>
          )}

          {tabName === 'activities' && (
            <div>
              <span>활동 지역</span>
              <span>{itemBDetail.data.area}</span>
            </div>
          )}
          {tabName === 'activities' && (
            <div>
              <span>우대 역량</span>
              <span>{itemBDetail.data.preferred_skills}</span>
            </div>
          )}
          {tabName === 'activities' && (
            <div>
              <span>활동 분야</span>
              <span>{itemBDetail.data.activity_field}</span>
            </div>
          )}

          <div>
            <span>활동 혜택</span>
            <span>
              {tabName === 'competitions'
                ? itemADetail.data.activity_benefit || ''
                : itemBDetail.data.activity_benefit}
            </span>
          </div>
          <div>
            <span>추가 혜택</span>
            <span>
              {tabName === 'competitions'
                ? itemADetail.data.bonus_benefit || ''
                : itemBDetail.data.bonus_benefit}
            </span>
          </div>
          <div>
            <span>홈페이지 URL</span>
            <span>
              <a
                href={
                  tabName === 'competitions'
                    ? itemADetail.data.homepageUrl
                    : itemBDetail.data.homepageUrl
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {tabName === 'competitions'
                  ? itemADetail.data.homepageUrl || ''
                  : itemBDetail.data.homepageUrl || ''}
              </a>
            </span>
          </div>
        </div>
      </div>
      <Divider size="sm" space={15} />
      <div className={styles.content}>
        <img
          src={tabName === 'competitions' ? itemADetail.data.imageUrl : itemBDetail.data.imageUrl}
          alt="detail"
        />
        <div>
          {tabName === 'competitions' ? itemADetail.data.description : itemBDetail.data.description}
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailPage;
