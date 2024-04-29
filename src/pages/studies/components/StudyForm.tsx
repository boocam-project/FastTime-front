import Input from '@/components/atoms/input';
import { useForm } from 'react-hook-form';

const StudyForm = () => {
  const { register } = useForm();

  return (
    <form>
      <Input
        name="title"
        label="제목"
        register={{
          ...register('title', {
            required: { value: true, message: '필수 항목입니다.' },
          }),
        }}
      />
    </form>
  );
};

export default StudyForm;
