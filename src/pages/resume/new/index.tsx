import MDEditor from '@uiw/react-md-editor';
import styles from './index.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { useCreateResume } from '../queries/useResume';

interface FormValues {
  title: string;
  content: string;
}

const CreateResumePage = () => {
  const { mutate } = useCreateResume();
  const { register, handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.title}
        {...register('title')}
        type="text"
        placeholder="제목을 입력하세요."
      />
      <Controller
        name="content"
        control={control}
        render={({ field }) => <MDEditor value={field.value} onChange={field.onChange} />}
      />
      <MDEditor.Markdown source={watch('content')} style={{ whiteSpace: 'pre-wrap' }} />
      <button>제출하기</button>
    </form>
  );
};

export default CreateResumePage;
