import { OfficeCostsPerMonthDTO } from '../../dtos/OfficeCostsPerMonthDTO';
import { Container } from './styles';

interface OfficeCostCardProps {
  officeCost: OfficeCostsPerMonthDTO;
}

export const OfficeCostCard = ({
  officeCost: { cost, office },
}: OfficeCostCardProps) => {
  return (
    <Container>
      <div>
        <strong>{office.name}</strong>
        <small>{cost}</small>
      </div>
      <span>{office.description}</span>
    </Container>
  );
};
