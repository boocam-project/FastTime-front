import Input from '@components/atoms/Input';
import Label from '@components/atoms/Label';
import { USERNAME_PATTERN } from '../../constants/constants';
import { useForm } from 'react-hook-form';

interface FormValues {
  name: string;
  email: string;
}

const FormGroup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange', defaultValues: { name: '', email: '' } });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <Label name="name" text="이름" />
        <Input
          id="name"
          value={watch('name', '')}
          aria-invalid={errors.name ? 'true' : 'false'}
          placeholder="홍길동"
          register={register('name', {
            required: true,
            minLength: {
              value: 10,
              message: '10자 이상 입력해주세요.',
            },
            maxLength: {
              value: 20,
              message: '20자 이하로 입력해주세요.',
            },
            pattern: {
              value: USERNAME_PATTERN,
              message: '유효하지 않은 이름입니다.',
            },
          })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <input type="submit" value="submit" />
    </form>
  );
};

export default FormGroup;
