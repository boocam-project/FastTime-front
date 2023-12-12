// import { useCallback, useEffect } from 'react';
// import { useRecoilState } from 'recoil';
// import { userState } from '@/store/store';
// import { useNavigate } from 'react-router-dom';

// const SessionExpirationCheck = () => {
//   const [userData, setUserData] = useRecoilState(userState);
//   const navigation = useNavigate();

//   const checkSessionStatus = useCallback(async () => {
//     try {
//       // Axios 인터셉터에서 이미 세션 확인 및 처리를 수행함.
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
