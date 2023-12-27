import { instance } from '@/api/client';
import Button from '@/components/atoms/button/Button';
import FlexBox from '@/components/atoms/flex';
import { AxiosError } from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UserActions = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await instance.delete(`api/v1/post`, {
        data: {
          postId: postId,
          memberId: 1,
        },
      });
      console.log(response.data);

      navigate('/community');
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  };

  return (
    <FlexBox gap="0.5rem">
      <Button variant="secondary">
        <Link to={`/edit/${postId}`}>수정</Link>
      </Button>
      <Button variant="secondary" onClick={handleDelete}>
        삭제
      </Button>
    </FlexBox>
  );
};

export default UserActions;
