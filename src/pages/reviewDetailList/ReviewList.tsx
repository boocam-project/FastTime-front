import styles from './ReviewList.module.scss';

const data = [
  {
    id: 7,
    authorNickname: 'nickcname1',
    bootcamp: '야놀자x패스트캠퍼스 부트캠프',
    title: '후기 수정',
    goodtags: ['강의가 좋아요'],
    badtags: ['피드백이 느려요'],
    rating: 5,
    content: '내용 수정',
  },
  {
    id: 6,
    authorNickname: 'nickcname2',
    bootcamp: '야놀자x패스트캠퍼스 부트캠프',
    title: 'test 부트캠프 리뷰',
    goodtags: ['친절해요', '강의가 좋아요'],
    badtags: ['불친절해요', '피드백이 느려요'],
    rating: 3,
    content: '뭐야',
  },
  {
    id: 5,
    authorNickname: 'nickcname3',
    bootcamp: '야놀자x패스트캠퍼스 부트캠프',
    title: '후기 수정111',
    goodtags: ['친절해요'],
    badtags: ['불친절해요'],
    rating: 2,
    content: '훈련장려금 언제나와???',
  },
];

const ReviewList = () => {
  return (
    <div className={styles.Container}>
      <ul className={styles.ListWrap}>
        {data.map((review) => {
          return (
            <li className={styles.List} key={review.id}>
              <div>
                <span className={styles.campName}>{review.bootcamp}</span>
                <span>{new Array(review.rating).fill('⭐')}</span>
              </div>
              <div>제목 : {review.title}</div>
              <div className={styles.tagContainer}>
                <div>
                  <div className={styles.tagTitle}>좋았던 점</div>
                  <div className={styles.tagList}>
                    {review.goodtags.map((tag, index) => (
                      <div key={index}># {tag}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className={styles.tagTitle}>아쉬웠던 점</div>
                  <div className={styles.tagList}>
                    {review.badtags.map((tag, index) => (
                      <div key={index}># {tag}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.content}>{review.content}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReviewList;
