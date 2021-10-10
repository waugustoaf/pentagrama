import { CSSProperties, ReactNode } from 'react';
import { Container, Content } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  containerStyle?: CSSProperties;
}

export const Button = ({
  children,
  containerStyle = {},
  ...rest
}: ButtonProps) => {
  return (
    <Container>
      <Content type='button' {...rest} style={containerStyle}>
        {children}
      </Content>
    </Container>
  );
};
