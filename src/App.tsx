import { useState } from 'react';
import Input from './components/atoms/Input';

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
