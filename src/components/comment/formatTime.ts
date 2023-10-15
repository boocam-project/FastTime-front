export const formatTime = (time: string) => {
  const date = new Date(time);
  date.setHours(date.getHours() + 9);

  return date.toISOString();
};
