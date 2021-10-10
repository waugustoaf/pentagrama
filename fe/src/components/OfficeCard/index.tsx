import { OfficeDTO } from '../../dtos/OfficeDTO';
import { Container } from './styles';

interface OfficeCardProps {
  office: OfficeDTO;
}

export const OfficeCard = ({ office }: OfficeCardProps) => {
  return (
    <Container>
      <span>{office.name}</span>
      <p>{office.description}</p>
    </Container>
  );
};
