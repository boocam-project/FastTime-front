import Input from '@components/atoms/input'; // Input 컴포넌트를 가져옴
import styles from './login.module.scss';
import Button from '@components/atoms/button';
import { PATTERNS } from '../../../constants/constants'; // 패턴을 가져옴

const Login = () => {
  return (
    <>
      <div className={styles.roundedShape}></div>
      <div className={styles.loginContainer}>
        <h1 className={styles.FTtitle}>FAST TIME</h1>
        <form className={styles.loginForm}>
          <h2>로그인</h2>
          <Input
            name="email" // name을 email로 변경
            label=""
            type="text"
            className={styles.loginFormInput}
            placeholder="Email" // placeholder도 변경
            errorMessage="유효한 이메일을 입력해주세요." // 에러 메시지 설정
            style={{ marginBottom: '5px' }}
          />
          <Input
            name="password"
            label=""
            type="password"
            className={styles.loginFormInput}
            placeholder="Password"
            pattern={PATTERNS.password.toString()} // 정규식 패턴을 문자열로 변환
            errorMessage="비밀번호는 최소 8자, 영문, 숫자, 특수문자를 포함해야 합니다." // 에러 메시지 설정
            style={{ marginBottom: '10px' }}
          />
          <a className={styles.findPassword} href="/forgot-password">
            비밀번호 찾기
          </a>
          <Button className="default" show={true}>
            로그인
          </Button>
          <Button className="default" show={true}>
            회원가입
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
