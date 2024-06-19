import { useForm } from 'react-hook-form';
import styles from './signIn.module.scss';
import styles2 from '../atoms/button/index.module.scss';
import classNames from 'classnames/bind';
import Input from '../atoms/input';
import { PATTERNS } from '@/constants/constants';
import Button from '../atoms/button';
// import { Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
// import { useNavigate } from 'react-router-dom';
// import { instance } from '@/api/client';
// import { useSetRecoilState } from 'recoil';
// import { userState } from '@/store/store';
// import { setTokenToLocalStorage } from './utils/getToken';

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInForm = () => {
  const cx = classNames.bind(styles);
  const cx2 = classNames.bind(styles2);

  const { mutate } = useAuth();
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

  const onSubmit = async (data: SignInFormValues) => {
    mutate(data);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.logoImageDiv}>
          <img src="/src/assets/new_logo.png" alt="Logo" style={{ width: '140px' }} />
        </div>
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
          })}
          placeholder="비밀번호"
          value={watch('password')}
          errorMessage={errors.password?.message}
          name="password"
          label="비밀번호"
          variant="defaultInput"
        />
        <Button type="submit" className={cx('signInBtn') + ' ' + cx2('default-gray-200')} show>
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
