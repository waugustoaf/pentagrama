import { CSSProperties } from 'react';
import { Container } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  register?: any;
  name?: string;
  containerStyle?: CSSProperties;
}

export const Input = ({
  error,
  name = '',
  register = () => {},
  containerStyle,
  ...rest
}: InputProps) => {
  return (
    <Container error={error}>
      <input type='text' {...rest} {...register(name)} style={containerStyle} />
      {error && <span>{error}</span>}
    </Container>
  );
};
