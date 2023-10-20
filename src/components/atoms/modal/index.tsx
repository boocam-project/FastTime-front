import styles from './modal.module.scss';
import { instance } from '@/api/client';
import { useQuery } from 'react-query';
import Button from '../button';
import Input from '../input';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { createBlob, uploadImageToFirebase } from '@/hooks/useImageConvert';
import useBlobUrl from '@/hooks/useBlobUrl';
interface FetchDataType {
  nickname: string;
  email: string;
  profileImageUrl?: string;
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
    handleSubmit,
  } = useForm<FetchDataType>({ defaultValues, mode: 'all' });
  const [imagePreview, setImagePreview] = useState('/src/assets/user.png');

  useQuery<FetchDataType, Error>({
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

  const imgClickHandler = () => {
    const imageInput = document.getElementById('profileImageUrl');
    if (imageInput) {
      imageInput.click();
    }
  };

  const image = watch('profileImageUrl');

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      if (typeof file === 'string') {
        return;
      }
      setImagePreview(URL.createObjectURL(file));
    }
  }, [image]);

  const uploadImageAndChangeURL = async () => {
    const blob = await createBlob(imagePreview);
    const downloadUrl = await uploadImageToFirebase(blob);
    return downloadUrl;
  };

  const submitForm = async (data: FetchDataType) => {
    try {
      const profileImageUrl = await uploadImageAndChangeURL();

      console.log(data);
      console.log(typeof profileImageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>프로필 설정</h2>
      <form className={styles.textContainer} onSubmit={handleSubmit(submitForm)}>
        <img src={imagePreview} className={styles.userProfile} onClick={imgClickHandler} />
        <input
          {...register('profileImageUrl')}
          id="profileImageUrl"
          type="file"
          className={styles.userProfileInput}
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
      </form>
      <div className={styles.btnContainer}>
        <Button
          className="default-red-400"
          type="submit"
          show={true}
          onClick={handleSubmit(submitForm)}
        >
          수정
        </Button>
        <Button className="default-red-200" type="button" show={true} onClick={cancelHandler}>
          취소
        </Button>
      </div>
    </div>
  );
};

export default Modal;
