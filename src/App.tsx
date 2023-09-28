import Input from '@components/atoms/input';
import FormContainer from '@components/form';
import { USERNAME_PATTERN } from './constants/constants';

function App() {
  return (
    <>
      <FormContainer>
        <Input
          className="search"
          name="이름"
          label="이름"
          placeholder="홍길동"
          registerOptions={{
            required: '이름을 입력해주세요.',
            minLength: { value: 5, message: '5글자 이상 입력해주세요.' },
            maxLength: { value: 15, message: '15글자 이하로 입력해주세요.' },
            pattern: {
              value: USERNAME_PATTERN,
              message: '유효한 이름을 입력해주세요.',
            },
          }}
        />
      </FormContainer>
    </>
  );
}

export default App;
