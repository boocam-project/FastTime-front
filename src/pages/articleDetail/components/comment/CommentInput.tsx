import styles from './CommentInput.module.scss';
import { ENDPOINTS } from '@/api/apiConfig';
import { instance } from '@/api/client';
import Button from '@/components/atoms/button/Button';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAutoSizeTextArea from '../../hooks/useAutoSizeTextArea';

interface CommentInputProps {
  parentCommentId?: number;
}

const CommentInput = ({ parentCommentId }: CommentInputProps) => {
  const { id } = useParams();
  const [comment, setComment] = useState({
    content: '',
    anonymity: false,
  });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutoSizeTextArea(textAreaRef.current, comment.content);

  const handleSubmit = async () => {
    let response;

    if (parentCommentId) {
      response = await instance.post(`${ENDPOINTS.comments}/${parseInt(id!)}`, {
        ...comment,
        parentCommentId,
      });
    } else {
      response = await instance.post(`${ENDPOINTS.comments}/${parseInt(id!)}`, {
        ...comment,
      });
    }

    console.log(response.data);
  };

  return (
    <div className={styles.box}>
      <textarea
        ref={textAreaRef}
        rows={1}
        className={styles.textArea}
        value={comment.content}
        onChange={(e) => setComment((prev) => ({ ...prev, content: e.target.value }))}
        placeholder="댓글을 입력하세요."
      />
      <div className={styles.actions}>
        <label htmlFor={parentCommentId ? 'isAnonymityChild' : 'isAnonymity'}>
          익명{' '}
          <input
            id={parentCommentId ? 'isAnonymityChild' : 'isAnonymity'}
            type="checkbox"
            checked={comment.anonymity}
            onChange={(e) => setComment((prev) => ({ ...prev, anonymity: e.target.checked }))}
          />
        </label>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          등록
        </Button>
      </div>
    </div>
  );
};

export default CommentInput;
