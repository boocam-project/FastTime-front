import { useForm } from 'react-hook-form';
import styles from './signUp.module.scss';
import Input from '../atoms/input';
import { PATTERNS } from '@/constants/constants';
import Button from '../atoms/button';
import { Link } from 'react-router-dom';
import { instance } from '@/api/client';

interface SignUpFormValues {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({ mode: 'onChange' });

  const signUp = async (data: SignUpFormValues) => {
    try {
      const response = await instance.post('/v1/join', data);
      if (response.status === 200) {
        console.log('회원가입이 성공했습니다.');
      } else {
        console.error('회원가입 실패:', response.data);
      }
    } catch (error) {
      console.error('서버 요청 중 오류가 발생했습니다.', error);
    }
  };

  const onSubmit = async (data: SignUpFormValues) => {
    console.log('회원가입 데이터:', data);
    await signUp(data);
  };

  const handleEmailVerification = async () => {
    try {
      const response = await instance.post('/v1/emailconfirm', {
        email: watch('email'),
      });
      if (response.status === 200) {
        console.log('이메일 전송 성공');
      } else {
        console.error('이메일 전송 실패:', response.data);
      }
    } catch (error) {
      console.error('서버 요청 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>회원가입</h2>
        <Input
          type="text"
          register={register('nickname', {
            required: '닉네임을 입력해주세요.',
          })}
          value={watch('nickname')}
          errorMessage={errors.nickname?.message}
          name="nickname"
          label="닉네임"
          variant="defaultInput"
        />
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
        <Button type="button" className="default-red-200" onClick={handleEmailVerification} show>
          이메일 인증
        </Button>
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
        <Input
          type="password"
          register={register('confirmPassword', {
            required: '비밀번호를 다시 입력해주세요.',
            validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
          })}
          value={watch('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
          name="confirmPassword"
          label="비밀번호 확인"
          variant="defaultInput"
        />
        <Button type="submit" className="default-red-300" show>
          회원가입
        </Button>
        <div>
          <span>이미 계정이 있으신가요? </span>
          <Link to="/login">로그인</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
