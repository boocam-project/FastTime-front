import Input from '@components/atoms/input';
import { USERNAME_PATTERN } from '../../constants/constants';
import { useForm } from 'react-hook-form';

const FormContainer = () => {
  const {
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  return (
    <form>
      <Input
        type="defaultInput"
        name="이름"
        label="이름"
        register={register('name', {
          required: '이름을 입력해주세요.',
          minLength: { value: 5, message: '5글자 이상 입력해주세요.' },
          maxLength: { value: 15, message: '15글자 이하로 입력해주세요.' },
          pattern: {
            value: USERNAME_PATTERN,
            message: '유효한 이름을 입력해주세요.',
          },
        })}
        errorMessage={errors.name?.message}
      />
      <Input type="searchInput" className="search" name="이메일" label="이메일" />
    </form>
  );
};

export default FormContainer;
