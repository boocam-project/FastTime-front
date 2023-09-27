import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface Props {
  children: ReactNode;
}

const FormContainer = ({ children }: Props) => {
  const methods = useForm({ mode: 'onChange' });

  return (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  );
};

export default FormContainer;
