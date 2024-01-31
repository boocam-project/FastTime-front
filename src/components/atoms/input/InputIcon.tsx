import { ReactComponent as Check } from '@/assets/icons/check.svg';

interface Props {
  isValid: boolean;
  type?: string;
}

const InputIcon = ({ isValid, type }: Props) => {
  switch (type) {
    case 'defaultInput':
      return isValid && <Check />;
    default:
      return null;
  }
};

export default InputIcon;
