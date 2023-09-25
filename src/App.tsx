import Input from '@components/atoms/Input';
import { useState } from 'react';

function App() {
  const [text, setTest] = useState('');

  return (
    <>
      <Input
        className=""
        name="name"
        value={text}
        placeholder="test"
        onChange={(e) => setTest(e.target.value)}
      />
    </>
  );
}

export default App;
