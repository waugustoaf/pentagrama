import { OfficeDTO } from './OfficeDTO';

export interface OfficeCostsPerMonthDTO {
  id: string;
  cost: string;
  office: OfficeDTO;
}
