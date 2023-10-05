import Input from '../../atoms/input'; // Input 컴포넌트를 가져옴
import styles from './login.module.scss';
import Button from '@components/atoms/button';

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.FTtitle}>FAST TIME</h1>
      <form className={styles.loginForm}>
        <h2>로그인</h2>
        <Input
          name="username"
          label=""
          type="text"
          className={styles.loginFormInput}
          placeholder="Username"
          style={{ marginBottom: '5px' }}
        />
        <Input
          name="password"
          label=""
          type="password"
          className={styles.loginFormInput}
          placeholder="Password"
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
  );
};

export default Login;
