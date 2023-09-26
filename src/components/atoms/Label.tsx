interface LabelProps {
  name: string;
  text: string;
}

const Label = ({ name, text }: LabelProps) => {
  return <label htmlFor={name}>{text}</label>;
};

export default Label;
