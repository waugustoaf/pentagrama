import { ICreateOfficeCostDTO } from '../dtos/ICreateOfficeCostDTO';
import { Office } from '../infra/typeorm/entities/Office';
import { OfficeCost } from '../infra/typeorm/entities/OfficeCost';

export interface FindByPersonData {
  person_id: string;
  month: string;
  year: string;
}

export type PeopleMonthHours = { person_id: string; hours: number }[];
export interface OfficeMonthCosts extends Office {
  office_id: string;
  office_cost: string;
}

export interface PeopleMonthHoursRequest {
  month: number;
  year: number;
}

export interface GetByMonthAndOfficeData {
  month: number;
  year: number;
  officeId: string;
}
export interface GetByMonthData {
  month: number;
  year: number;
}

export interface IOfficeCostsRepository {
  create(data: ICreateOfficeCostDTO): Promise<OfficeCost>;
  findByPerson(data: FindByPersonData): Promise<OfficeCost[]>;
  getPeopleMonthHours(data: PeopleMonthHoursRequest): Promise<PeopleMonthHours>;
  getByMonth(data: GetByMonthAndOfficeData): Promise<OfficeCost[]>;
  getOfficeMonthCosts(data: GetByMonthData): Promise<OfficeMonthCosts[]>;
}
