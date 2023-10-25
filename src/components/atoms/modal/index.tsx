import styles from './modal.module.scss';
import { instance } from '@/api/client';
import { useQuery, useMutation } from '@tanstack/react-query';
import Button from '../button';
import Input from '../input';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { createBlob, uploadImageToFirebase } from '@/hooks/useImageConvert';
import { useNavigate } from 'react-router-dom';
import { userState } from '@/store/store';
import { useSetRecoilState } from 'recoil';

interface UserType {
  nickname: string;
  email: string;
  profileImageUrl?: string;
}

type PropsType = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const fetchData = async () => {
  const response = await instance.get('api/v1/mypage');
  const result = await response.data;
  return result.data;
};

const mutationsData = async (data: UserType) => {
  const response = await instance.put('/api/v1/retouch-member', data);
  return response.data;
};

const Modal = ({ setModalOpen }: PropsType) => {
  const navigation = useNavigate();
  const setData = useSetRecoilState(userState);

  const [imagePreview, setImagePreview] = useState('');
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
  } = useForm<UserType>({ defaultValues, mode: 'all' });

  const mutation = useMutation({
    mutationFn: mutationsData,
  });

  const { data, isSuccess, isLoading } = useQuery<UserType, Error>({
    queryKey: ['getMypage'],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (isSuccess) {
      reset(data);
      if (data.profileImageUrl) {
        setImagePreview(data.profileImageUrl);
      } else {
        setImagePreview('/src/assets/user.png');
      }
    }
  }, [data]);

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

  const imgClickHandler = () => {
    const imageInput = document.getElementById('profileImageUrl');
    if (imageInput) {
      imageInput.click();
    }
  };

  const cancelHandler = () => {};

  const uploadImageAndChangeURL = async () => {
    if (imagePreview) {
      const blob = await createBlob(imagePreview);
      const downloadUrl = await uploadImageToFirebase(blob);
      return downloadUrl;
    }
  };

  const submitForm = async (data: UserType) => {
    const { nickname, email, profileImageUrl } = data;
    try {
      const firebaseImgUrl = await uploadImageAndChangeURL();
      if (profileImageUrl) {
        const updateData = {
          nickname,
          email,
          image: firebaseImgUrl,
        };
        mutation.mutate(updateData, {
          onSuccess: () => {
            setData((prev) => ({ ...prev, nickname }));
            setModalOpen(false);
            navigation('/mypage');
          },
        });
      } else {
        const updateData = {
          nickname,
          email,
          image: profileImageUrl,
        };
        mutation.mutate(updateData, {
          onSuccess: () => {
            setData((prev) => ({ ...prev, nickname }));
            setModalOpen(false);
            navigation('/mypage');
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading..</div>
      ) : (
        <div className={styles.container}>
          <h2>프로필 설정</h2>
          <form className={styles['text-container']} onSubmit={handleSubmit(submitForm)}>
            <img
              src={imagePreview}
              className={styles['user-profile']}
              onClick={imgClickHandler}
              id="image-preview"
            />
            <input
              {...register('profileImageUrl')}
              id="profileImageUrl"
              type="file"
              className={styles['user-profile-input']}
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
          <div className={styles['btn-container']}>
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
      )}
    </>
  );
};

export default Modal;
