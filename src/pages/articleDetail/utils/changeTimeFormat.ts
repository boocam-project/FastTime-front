import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export const formatTime = (time: string) => {
  const now = dayjs();
  const createdAt = dayjs(time);

  const diffMon = now.diff(createdAt, 'month');
  const diffWeek = now.diff(createdAt, 'week');
  const diffDay = now.diff(createdAt, 'day');
  const diffMin = now.diff(createdAt, 'minute');

  if (diffMin < 1) {
    return '방금 전';
  } else if (diffMin < 60) {
    return `${diffMin}분 전`;
  } else if (diffDay < 1) {
    return `${(diffMin / 60) | 0}시간 전`;
  } else if (diffWeek < 1) {
    return `${diffDay}일 전`;
  } else if (diffMon < 1) {
    return `${diffWeek}주 전`;
  } else if (diffMon < 2) {
    return `${diffMon}달 전`;
  } else {
    return `${createdAt.format('HHHH-MM-DD HH:mm:ss')}`;
  }
};
