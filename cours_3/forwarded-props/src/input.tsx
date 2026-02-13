import type { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {
  richText?: boolean;
}

const Input = ({ richText, ...props }: InputProps) => {
  if (richText) {
    return <textarea {...props as ComponentProps<'textarea'>} />;
  }

  return <input {...props} />;
};

export default Input;