// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const instance = axios.create();

// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response.status === 403) {
//       alert('세션이 만료되었거나 권한이 없습니다. 다시 로그인해주세요.');
//       const navigate = useNavigate();
//       navigate('/signIn');
//     }
//     return Promise.reject(error);
//   }
// );

// export default instance;
