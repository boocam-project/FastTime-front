import { useState } from 'react';
import Activity from './components/Activity';
import Competition from './components/Competition';
import TabTitle from './components/TabTitle';
import styles from './index.module.scss';

const ActivityPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <TabTitle text="공모전" active={currentTab === 0} onClick={() => setCurrentTab(0)} />
        <TabTitle text="대외 활동" active={currentTab === 1} onClick={() => setCurrentTab(1)} />
      </div>
      {currentTab === 0 && <Activity />}
      {currentTab === 1 && <Competition />}
    </div>
  );
};

export default ActivityPage;
