import { BsCheck2 } from 'react-icons/bs';

interface Props {
  isValid: boolean;
  type?: string;
}

const InputIcon = ({ isValid, type }: Props) => {
  switch (type) {
    case 'defaultInput':
      return isValid && <BsCheck2 fill="#2273ed" />;
    default:
      return null;
  }
};

export default InputIcon;
