import styles from './modal.module.scss';
import { instance } from '@/api/client';
import { useQuery } from 'react-query';
import Button from '../button';
import Input from '../input';
import { useForm } from 'react-hook-form';

interface FetchDataType {
  nickname: string;
  email: string;
  profileImageUrl: null | string;
}

const fetchData = async () => {
  const response = await instance.get('api/v1/mypage');
  const result = await response.data;
  return result.data;
};
type PropsType = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Modal = ({ setModalOpen }: PropsType) => {
  const defaultValues = {
    nickname: '',
    email: '',
    profileImageUrl: '',
  };

  const {
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm<FetchDataType>({ defaultValues, mode: 'all' });

  const { data } = useQuery<FetchDataType, Error>({
    queryKey: ['get_mypage'],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      reset(data);
    },
  });

  const cancelHandler = () => {
    setModalOpen(false);
  };

  return (
    <form className={styles.container}>
      <h2>프로필 설정</h2>
      {data?.profileImageUrl ? (
        <img className={styles.userProfile} src={data?.profileImageUrl} />
      ) : (
        <img className={styles.userProfile} src="/src/assets/user.png" />
      )}
      <div className={styles.textContainer}>
        <input
          {...register('profileImageUrl')}
          id="profileImageUrl"
          type="file"
          className="hidden"
          accept="image/*"
        />
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
            required: '닉네임을 입력해주세요.',
          })}
          value={watch('email')}
          errorMessage={errors.email?.message}
          name="email"
          label="이메일"
          variant="defaultInput"
        />
      </div>
      <div className={styles.btnContainer}>
        <Button className="default-red-400" type="button" show={true}>
          수정
        </Button>
        <Button className="default-red-200" type="button" show={true} onClick={cancelHandler}>
          취소
        </Button>
      </div>
    </form>
  );
};

export default Modal;
