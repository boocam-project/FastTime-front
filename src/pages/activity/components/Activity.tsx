import { type ActivitiesQuery } from '@/api/activitiesService';
import Divider from '@/components/atoms/Divider';
import useActivitiesData from '@/hooks/activitiesData/query/useActivitiesData';
import { useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import styles from '../index.module.scss';
import Item from './Item';
import StatusBadge from './StatusBadge';
import ActivitySkeleton from './ActivitySkeleton';

const Activity = () => {
  const navigate = useNavigate();

  const [activitiesQuery, setActivitiesQuery] = useState<ActivitiesQuery>({
    keyword: '',
    before: true,
    during: true,
    closed: false,
    orderBy: 'latest',
    page: 1,
    pageSize: 6,
  });

  const { data: activities, isLoading } = useActivitiesData(activitiesQuery);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageList, setCurrentPageList] = useState(0);

  const updateActivitiesQuery = (updates: Partial<ActivitiesQuery>) => {
    setActivitiesQuery((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <div>
      {/* 필터링 검색 바 */}
      <div className={styles.searchContainer}>
        <div>
          <StatusBadge
            text={'모집 전'}
            active={activitiesQuery.before}
            onClick={() => {
              updateActivitiesQuery({ before: !activitiesQuery.before });
            }}
          />
          <StatusBadge
            text={'모집 중'}
            active={activitiesQuery.during}
            onClick={() => {
              updateActivitiesQuery({ during: !activitiesQuery.during });
            }}
          />
          <StatusBadge
            text={'모집 마감'}
            active={activitiesQuery.closed}
            onClick={() => {
              updateActivitiesQuery({ closed: !activitiesQuery.closed });
            }}
          />
        </div>
        <div className={styles.searchInputWrap}>
          <div>
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              value={activitiesQuery.keyword as string}
              onChange={(e) => {
                updateActivitiesQuery({ keyword: e.target.value });
              }}
            />
            <span>
              <IoIosSearch />
            </span>
          </div>
          <div className={styles.itemOrder}>
            <button
              style={{ color: activitiesQuery.orderBy === 'latest' ? 'black' : '#888' }}
              onClick={() => {
                updateActivitiesQuery({ orderBy: 'latest' });
              }}
            >
              최신순
            </button>
            <button
              style={{ color: activitiesQuery.orderBy === 'd-day' ? 'black' : '#888' }}
              onClick={() => {
                updateActivitiesQuery({ orderBy: 'd-day' });
              }}
            >
              마감일순
            </button>
          </div>
        </div>
      </div>
      <Divider size="sm" />
      {/* 아이템 리스트 */}

      {isLoading && (
        <ul className={styles.listContainer}>
          <ActivitySkeleton />
          <ActivitySkeleton />
          <ActivitySkeleton />
          <ActivitySkeleton />
          <ActivitySkeleton />
          <ActivitySkeleton />
        </ul>
      )}
      {activities?.activities.length === 0 ? (
        <div>등록된 대외 활동이 없습니다.</div>
      ) : (
        <ul className={styles.listContainer}>
          {activities?.activities.map((item, index) => {
            return (
              <Item
                title={item.title}
                organization={item.organization}
                imageUrl={item.imageUrl}
                dDay={item.dDay}
                itemId={item.id}
                type="activities"
                key={item.id}
                onClick={() => {
                  navigate(`/activity/${index}?t=activities`);
                }}
              />
            );
          })}
        </ul>
      )}

      <div className={styles.page}>
        <button
          onClick={() => {
            setCurrentPageList((prev) => prev - 1);
          }}
          disabled={currentPageList === 0}
        >
          <GrPrevious />
        </button>

        <span>
          {/** *
           * TODO: 리스트 아이템 개수 연결
           */}
          {activities?.totalPages &&
            Array.from({ length: activities?.totalPages }, (_, i) => i + 1)
              .slice(currentPageList * 5, currentPageList * 5 + 5)
              .map((number, index) => {
                return (
                  <button
                    key={index}
                    style={{ backgroundColor: number === currentPage ? '#ffdadf' : '' }}
                    onClick={() => {
                      setCurrentPage(number);
                      setActivitiesQuery((prev) => ({ ...prev, page: number }));
                    }}
                  >
                    {number}
                  </button>
                );
              })}
        </span>
        <button
          onClick={() => {
            setCurrentPageList((prev) => prev + 1);
          }}
          disabled={activities && currentPageList === Math.ceil(activities.totalPages / 5) - 1}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default Activity;
