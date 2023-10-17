import { useForm } from 'react-hook-form';
import styles from './signIn.module.scss';
import Input from '../atoms/input';
import { PATTERNS } from '@/constants/constants';
import Button from '../atoms/button';
import { Link, useNavigate } from 'react-router-dom';
import { instance } from '@/api/client';
import { useSetRecoilState } from 'recoil';
import { userState } from '@/store/store';

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInForm = () => {
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({ mode: 'onChange' });
  const setData = useSetRecoilState(userState);
  const onSubmit = async (data: SignInFormValues) => {
    const response = await instance.post('/api/v1/login', {
      email: data.email,
      password: data.password,
    });
    console.log(response);

    console.log(response.headers);

    if (response.status === 200) {
      console.log('success');
      setData({ ...response.data.data, login: true });
      navigate('/community');
    } else {
      console.log('fail');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>로그인</h2>
        <Input
          type="text"
          register={register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: PATTERNS.email,
              message: '유효한 이메일을 입력해주세요.',
            },
          })}
          value={watch('email')}
          errorMessage={errors.email?.message}
          name="email"
          label="이메일"
          variant="defaultInput"
        />
        <Input
          type="password"
          register={register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: { value: 10, message: '10글자 이상 입력해주세요.' },
            maxLength: { value: 20, message: '20글자 이하로 입력해주세요.' },
            pattern: {
              value: PATTERNS.password,
              message: '영문, 숫자, 특수문자를 포함해주세요.',
            },
          })}
          value={watch('password')}
          errorMessage={errors.password?.message}
          name="password"
          label="비밀번호"
          variant="defaultInput"
        />
        <Button type="submit" className="default-red-200" show>
          로그인
        </Button>
        <div>
          <span>아직 아이디가 없나요? </span>
          <Link to="/signup">회원가입</Link>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
