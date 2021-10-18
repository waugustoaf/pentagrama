import Link from 'next/link';
import { Container } from './styles';

interface ErrorCardProps {
  message: string;
  actionText: string;
  onClick?: () => void;
  href?: string;
}

export const ErrorCard = ({
  message,
  actionText,
  href = '',
  onClick,
}: ErrorCardProps) => {
  return (
    <Container>
      <img src='/images/bad-face.svg' alt='Erro' loading='lazy' />

      <div>
        <span>{message}</span>

        {href ? (
          <Link href={href}>
            <a>{actionText}</a>
          </Link>
        ) : (
          <button onClick={onClick}>{actionText}</button>
        )}
      </div>
    </Container>
  );
};
