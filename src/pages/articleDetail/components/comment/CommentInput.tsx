import { instance } from '@/api/client';
import Button from '@/components/atoms/button/Button';
import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

const CommentInput = () => {
  const { id } = useParams();
  const [comment, setComment] = useState({
    content: '',
    anonymity: false,
    parentCommentId: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleSubmit = async () => {
    console.log(comment);
    await instance.post(`/api/v1/comments/${parseInt(id!)}`, comment);
  };

  return (
    <>
      <label>
        댓글 입력
        <input type="text" value={comment.content} onChange={handleChange} />
      </label>
      <Button variant="primary" onClick={handleSubmit}>
        등록
      </Button>
    </>
  );
};

export default CommentInput;
