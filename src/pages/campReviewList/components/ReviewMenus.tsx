import Button from '@/components/atoms/button/Button';

import { ReactComponent as PenSquare } from '@/assets/icons/pen_square.svg';

const ReviewMenus = () => {
  return (
    <Button variant="primary">
      <PenSquare />
      <span>리뷰 작성하기</span>
    </Button>
  );
};

export default ReviewMenus;
