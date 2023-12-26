import { useForm } from 'react-hook-form';
import styles from './signIn.module.scss';
import Input from '../atoms/input';
import { PATTERNS } from '@/constants/constants';
import Button from '../atoms/button';
import { useNavigate } from 'react-router-dom';
import { instance } from '@/api/client';
import { useSetRecoilState } from 'recoil';
import { userState } from '@/store/store';
import { setTokenToLocalStorage } from './utils/getToken';

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
  } = useForm<SignInFormValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const setData = useSetRecoilState(userState);

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const response = await instance.post('/api/v1/login', {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const { data } = response.data;
        const accessToken = data.token.accessToken;
        const refreshToken = data.token.refreshToken;

        setTokenToLocalStorage(accessToken, refreshToken);
        setData({ ...response.data.data, isLogin: true });
        navigate('/community');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        alert('이메일과 비밀번호를 다시 확인해주세요.');
      } else {
        console.error('서버 요청 중 오류가 발생했습니다.', error);
        alert('서버 요청 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 style={{ fontWeight: 'normal' }}>로그인</h2>
        <Input
          type="text"
          register={register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: PATTERNS.email,
              message: '유효한 이메일을 입력해주세요.',
            },
          })}
          placeholder="아이디(이메일)"
          value={watch('email')}
          errorMessage={errors.email?.message}
          name="email"
          label="아이디(이메일)"
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
          placeholder="비밀번호"
          value={watch('password')}
          errorMessage={errors.password?.message}
          name="password"
          label="비밀번호"
          variant="defaultInput"
        />
        <Button type="submit" className="default-gray-200" show>
          로그인
        </Button>
        {/* <div>
          <span>아직 아이디가 없나요? </span>
          <Link to="/signup">회원가입</Link>
        </div> */}
      </form>
    </div>
  );
};

export default SignInForm;
