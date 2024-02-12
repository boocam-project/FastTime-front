import { userSignIn } from '@/api/authApi';
import { setTokenToLocalStorage } from '@/components/signIn/utils/getToken';
import { authState } from '@/recoil/authState';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const useAuth = () => {
  const [user, setUser] = useRecoilState(authState);
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

  return { mutate, user };
};

export default useAuth;
