import Link from 'next/link';
import { OfficeDTO } from '../../dtos/OfficeDTO';
import { Container } from './styles';

interface OfficeCardProps {
  office: OfficeDTO;
}

export const OfficeCard = ({ office }: OfficeCardProps) => {
  return (
    <Container>
      <div>
        <span>{office.name}</span>
        <Link href={`/office/register-costs/${office.id}`}>
          <a>Registrar custos</a>
        </Link>
      </div>
      <p>{office.description}</p>
    </Container>
  );
};
