// import { useCallback, useEffect } from 'react';
// import { useRecoilState } from 'recoil';
// import { userState } from '@/store/store';
// import { useNavigate } from 'react-router-dom';
// import { instance } from '@/api/client';

// const SessionExpirationCheck = () => {
//   const [userData, setUserData] = useRecoilState(userState);
//   const navigation = useNavigate();

//   const checkSessionStatus = useCallback(async () => {
//     try {
//       const response = await instance.post('/api/v1/login');
//       if (response.status === 403) {
//         setUserData({ ...userData, login: false });
//         navigation('/signin');
//       } else if (response.status === 200) {
//         setUserData(response.data);
//       }
//     } catch (error) {
//       console.error('세션 확인 중 오류 발생', error);
//     }
//   }, [userData, setUserData, navigation]);

//   useEffect(() => {
//     checkSessionStatus();

//     const interval = setInterval(
//       () => {
//         checkSessionStatus();
//       },
//       1000 * 60 * 30
//     );

//     return () => clearInterval(interval);
//   }, [checkSessionStatus]);
//   return null;
// };

// export default SessionExpirationCheck;
