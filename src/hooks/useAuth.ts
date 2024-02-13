import { userSignIn } from '@/api/authApi';
import { setTokenToLocalStorage } from '@/components/signIn/utils/getToken';
import { authState } from '@/recoil/authState';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

const useAuth = () => {
  const setUser = useSetRecoilState(authState);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: userSignIn,
    onSuccess: ({ data: { member, token } }) => {
      setTokenToLocalStorage(token.accessToken, token.refreshToken);
      setUser({ ...member, loggedIn: true });
      navigate('/community');
    },
    onError: () => {
      toast.error('로그인에 실패했습니다');
    },
  });

  return { mutate };
};

export default useAuth;
