import { type CompetitionsQuery } from '@/api/competitionsService';
import Divider from '@/components/atoms/Divider';
import useAllCompetitionData from '@/hooks/competitionsData/query/useAllCompetitionData';
import { useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import styles from '../index.module.scss';
import Item from './Item';
import StatusBadge from './StatusBadge';
import ActivitySkeleton from './ActivitySkeleton';

const Competition = () => {
  const navigate = useNavigate();

  const [competitionsQuery, setCompetitionsQuery] = useState<CompetitionsQuery>({
    keyword: '',
    before: true,
    continues: true,
    after: false,
    orderBy: 'latest',
    page: 1,
    pageSize: 6,
  });

  const { data: competitions, isLoading } = useAllCompetitionData(competitionsQuery);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageList, setCurrentPageList] = useState(0);

  const updateCompetitionsQuery = (updates: Partial<CompetitionsQuery>) => {
    setCompetitionsQuery((prev) => ({
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
            active={competitionsQuery.before}
            onClick={() => {
              updateCompetitionsQuery({ before: !competitionsQuery.before });
            }}
          />
          <StatusBadge
            text={'모집 중'}
            active={competitionsQuery.continues}
            onClick={() => {
              updateCompetitionsQuery({ continues: !competitionsQuery.continues });
            }}
          />
          <StatusBadge
            text={'모집 마감'}
            active={competitionsQuery.after}
            onClick={() => {
              updateCompetitionsQuery({ after: !competitionsQuery.after });
            }}
          />
        </div>
        <div className={styles.searchInputWrap}>
          <div>
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              value={competitionsQuery.keyword as string}
              onChange={(e) => {
                updateCompetitionsQuery({ keyword: e.target.value });
              }}
            />
            <span>
              <IoIosSearch />
            </span>
          </div>
          <div className={styles.itemOrder}>
            <button
              style={{ color: competitionsQuery.orderBy === 'latest' ? 'black' : '#888' }}
              onClick={() => {
                updateCompetitionsQuery({ orderBy: 'latest' });
              }}
            >
              최신순
            </button>
            <button
              style={{ color: competitionsQuery.orderBy === 'd-day' ? 'black' : '#888' }}
              onClick={() => {
                updateCompetitionsQuery({ orderBy: 'd-day' });
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
      {competitions?.competitions.length === 0 ? (
        <div>등록된 공모전이 없습니다.</div>
      ) : (
        <ul className={styles.listContainer}>
          {competitions?.competitions.map((item, index) => {
            return (
              <Item
                title={item.title}
                organization={item.organization}
                imageUrl={item.imageUrl}
                dDay={item.dDay}
                itemId={item.id}
                type="competitions"
                key={item.id}
                onClick={() => {
                  navigate(`/activity/${index}?t=competitions`);
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
          {competitions?.totalPages &&
            Array.from({ length: competitions?.totalPages }, (_, i) => i + 1)
              .slice(currentPageList * 5, currentPageList * 5 + 5)
              .map((number, index) => {
                return (
                  <button
                    key={index}
                    style={{ backgroundColor: number === currentPage ? '#ffdadf' : '' }}
                    onClick={() => {
                      setCurrentPage(number);
                      setCompetitionsQuery((prev) => ({ ...prev, page: number }));
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
          disabled={competitions && currentPageList === Math.ceil(competitions.totalPages / 5) - 1}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default Competition;
