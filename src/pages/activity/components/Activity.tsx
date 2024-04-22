import Divider from '@/components/atoms/Divider';
import { useEffect, useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { IoIosSearch } from 'react-icons/io';
import Item from './Item';
import StatusBadge from './StatusBadge';
import { listARes } from '../constants';
import styles from '../index.module.scss';
// import useActivitiesData from '@/hooks/activitiesData/query/useActivitiesData';
import { type ActivitiesQuery } from '@/api/activitiesService';

const Activity = () => {
  const [activitiesQuery, setActivitiesQuery] = useState<ActivitiesQuery>({
    keyword: '',
    before: true,
    during: true,
    closed: false,
    orderBy: 'latest',
    page: 1,
    pageSize: 6,
  });

  // const { data: activities } = useActivitiesData(activitiesQuery);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageList, setCurrentPageList] = useState(0);

  useEffect(() => {
    console.log(activitiesQuery);
  }, [activitiesQuery]);

  const updateActivitiesQuery = (updates: Partial<ActivitiesQuery>) => {
    setActivitiesQuery((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // console.log(activities);

  return (
    <div className={styles.container}>
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
      <ul className={styles.listContainer}>
        {listARes.data.competitions.map((item) => {
          return (
            <Item
              title={item.title}
              organization={item.organization}
              imageUrl={item.imageUrl}
              dDay={item.dDay}
              itemId={item.id}
              type="competitions"
              key={item.id}
            />
          );
        })}
      </ul>
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
          {Array.from({ length: 49 }, (_, i) => i + 1)
            .slice(currentPageList * 5, currentPageList * 5 + 5)
            .map((number, index) => {
              return (
                <button
                  key={index}
                  style={{ backgroundColor: number === currentPage ? '#ffdadf' : '' }}
                  onClick={() => {
                    setCurrentPage(number);
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
          /**
           * TODO: ListARes.data.isLastPage 연결
           */
          disabled={false}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default Activity;
