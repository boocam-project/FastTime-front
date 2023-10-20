export const formatTime = (time: string | undefined | null) => {
  if (!time) return;

  const today = new Date();
  const date = new Date(time);

  const diff = today.getTime() - date.getTime();
  const diffDay = diff / (1000 * 60 * 60 * 24);
  const diffHour = diff / (1000 * 60 * 60);
  const diffMinute = diff / (1000 * 60);

  if (diffDay > 1) {
    return `${Math.floor(diffDay)}일 전`;
  } else if (diffHour > 1) {
    return `${Math.floor(diffHour)}시간 전`;
  } else if (diffMinute > 1) {
    return `${Math.floor(diffMinute)}분 전`;
  } else {
    return '방금 전';
  }
};
