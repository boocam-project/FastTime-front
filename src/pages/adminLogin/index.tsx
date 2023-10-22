import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './admin.module.scss';
import { instance } from '@/api/client';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '@/store/store';

type AdminValue = {
  email: string;
  password: string;
};

const adminLoginFetch = async (data: AdminValue) => {
  const response = await instance.post('/api/v1/admin/login', data);
  const result = response.data;
  return result;
};

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AdminValue>({
    shouldUseNativeValidation: true,
  });
  const setUserData = useSetRecoilState(userState);
  const navigation = useNavigate();
  const onSubmit: SubmitHandler<AdminValue> = async (data) => {
    try {
      const response = await adminLoginFetch(data);

      if (response.code === 200) {
        alert(response.message);
        setUserData((prev) => ({ ...prev, nickname: '관리자', login: !prev.login }));
        navigation('/admin/board');
      }
    } catch (error) {
      alert('등록된 회원이 아닙니다.');
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.article}>
        <h2>관리자 로그인</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            register={register('email', {
              required: '이메일을 입력해주세요.',
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
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
