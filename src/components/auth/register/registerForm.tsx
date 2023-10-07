import React, { useState } from 'react';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  // const [serverStatus, setServerStatus] = useState<string>(''); // 서버 상태 저장

  // useEffect(() => {
  //   // 컴포넌트가 처음으로 렌더링될 때 서버 상태를 확인
  //   const checkServerHealth = async () => {
  //     try {
  //       const response = await fetch('http://52.78.56.188:5001/health'); // 헬스체크 엔드포인트 URL로 변경
  //       if (response.ok) {
  //         setServerStatus('서버가 정상 작동 중입니다.');
  //       } else {
  //         setServerStatus('서버 응답에 문제가 있습니다.');
  //       }
  //     } catch (error) {
  //       setServerStatus('서버에 연결할 수 없습니다.');
  //     }
  //   };

  //   checkServerHealth();
  // }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === confirmPassword) {
      const data = {
        name,
        email,
        password,
      };

      try {
        const response = await fetch('http://52.78.56.188:5001/auth/signup', {
          // 서버 URL로 변경
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          // 서버에서 저장이 성공하면 클라이언트에서 추가 작업 수행
          const responseData = await response.json();
          console.log('서버 응답 데이터:', responseData);
          alert('데이터가 서버에 저장되었습니다.');
        } else {
          alert('데이터를 서버에 저장하는 중 문제가 발생했습니다.');
        }
      } catch (error) {
        console.error('데이터를 서버에 전송하는 중 오류가 발생했습니다:', error);
      }
    } else {
      // 비밀번호가 일치하지 않을 때 오류 메시지 표시
      setPasswordsMatch(false);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">이름:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} required />
        </div>
        <div>
          <label htmlFor="email">이메일:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">비밀번호 확인:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        {!passwordsMatch && <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>}
        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default RegisterForm;
