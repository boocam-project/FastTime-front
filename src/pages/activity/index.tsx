import Divider from '@/components/atoms/Divider';
import { useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { IoIosSearch } from 'react-icons/io';
import Item from './components/Item';
import StatusBadge from './components/StatusBadge';
import TabTitle from './components/TabTitle';
import { listARes, listBRes } from './constants';
import styles from './index.module.scss';

const ActivityPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageList, setCurrentPageList] = useState(0);

  const [order, setOrder] = useState<'latest' | 'd-day'>('latest');

  const [filter, setFilter] = useState([
    { title: '모집 전', active: false },
    { title: '모집 중', active: false },
    { title: '모집 마감', active: false },
  ]);

  const filteringItem = (index: number) => {
    setFilter((prev) =>
      prev.map((item, i) => (i === index ? { ...item, active: !item.active } : item))
    );
  };

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.tabContainer}>
        <TabTitle text="공모전" active={currentTab === 0} onClick={() => setCurrentTab(0)} />
        <TabTitle text="대외 활동" active={currentTab === 1} onClick={() => setCurrentTab(1)} />
      </div>
      {/* 필터링 검색 바 */}
      <div className={styles.searchContainer}>
        <div>
          {filter.map((item, index) => {
            return (
              <StatusBadge
                text={item.title}
                key={index}
                active={filter[index].active}
                onClick={() => filteringItem(index)}
              />
            );
          })}
        </div>
        <div className={styles.searchInputWrap}>
          <div>
            <input type="text" placeholder="검색어를 입력하세요." />
            <span>
              <IoIosSearch />
            </span>
          </div>
          <div className={styles.itemOrder}>
            <button
              style={{ color: order === 'latest' ? 'black' : '#888' }}
              onClick={() => {
                setOrder('latest');
              }}
            >
              최신순
            </button>
            <button
              style={{ color: order === 'd-day' ? 'black' : '#888' }}
              onClick={() => {
                setOrder('d-day');
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
        {currentTab === 0 &&
          listARes.data.competitions.map((item) => {
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

        {currentTab === 1 &&
          listBRes.data.activities.map((item) => {
            return (
              <Item
                title={item.title}
                organization={item.organization}
                imageUrl={item.imageUrl}
                dDay={item.dDay}
                itemId={item.id}
                type="activities"
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

export default ActivityPage;
