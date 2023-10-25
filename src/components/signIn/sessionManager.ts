// import { useCallback, useEffect } from 'react';
// import { useRecoilState } from 'recoil';
// import { userState } from '@/store/store';
// import { useNavigate } from 'react-router-dom';

// const SessionExpirationCheck = () => {
//   const [userData, setUserData] = useRecoilState(userState);
//   const navigation = useNavigate();

//   const checkSessionStatus = useCallback(async () => {
//     try {
//       const response = await fetch('???');
//       if (response.status === 403) {
//         setUserData({ ...userData, login: false });
//         navigation('/signin');
//       } else if (response.status === 200) {
//         // 세션이 유효한 경우
//         const userData = await response.json();
//         setUserData(userData);
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
