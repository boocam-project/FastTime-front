import { FallbackProps } from 'react-error-boundary';
import styles from './ErrorFallback.module.scss';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className={styles.container} role="alert">
      <h1>이용에 불편을 드려 죄송합니다.</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>다시 시도하기</button>
    </div>
  );
};

export default ErrorFallback;
