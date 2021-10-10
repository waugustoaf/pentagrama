import { ICreateOfficeCostDTO } from '@modules/offices/dtos/ICreateOfficeCostDTO';
import {
  FindByPersonData,
  GetByMonthAndOfficeData,
  GetByMonthData,
  IOfficeCostsRepository,
  OfficeMonthCosts,
  PeopleMonthHours,
  PeopleMonthHoursRequest,
} from '@modules/offices/repositories/IOfficeCostsRepository';
import { getRepository, Repository } from 'typeorm';
import { OfficeCost } from '../entities/OfficeCost';

export class OfficeCostsRepository implements IOfficeCostsRepository {
  private repository: Repository<OfficeCost>;

  constructor() {
    this.repository = getRepository(OfficeCost);
  }

  async create(data: ICreateOfficeCostDTO): Promise<OfficeCost> {
    const officeCost = this.repository.create(data);

    await this.repository.save(officeCost);

    return officeCost;
  }

  async findByPerson({
    month,
    person_id,
    year,
  }: FindByPersonData): Promise<OfficeCost[]> {
    const officeCosts = await this.repository.find({
      where: [{ month }, { person_id }, { year }],
    });

    return officeCosts;
  }

  async getPeopleMonthHours({
    month,
    year,
  }: PeopleMonthHoursRequest): Promise<PeopleMonthHours> {
    const peopleMonthHours: PeopleMonthHours = await this.repository.query(
      `SELECT oc.person_id, SUM(oc.hours) as hours FROM office_costs as oc WHERE oc.month = $1 AND oc.year = $2 GROUP BY oc.person_id; `,
      [month, year],
    );

    return peopleMonthHours;
  }

  async getByMonth({
    month,
    year,
    officeId,
  }: GetByMonthAndOfficeData): Promise<OfficeCost[]> {
    return await this.repository.find({
      where: `month = ${month} AND year = ${year} AND office_id = '${officeId}'`,
    });
  }

  async getOfficeMonthCosts({
    month,
    year,
  }: GetByMonthData): Promise<OfficeMonthCosts[]> {
    const officeMonthCosts: OfficeMonthCosts[] = await this.repository.query(
      `
        SELECT oc.office_id AS office_id, SUM(pt.monthly_wage) AS office_cost, office.* AS office
        FROM office_costs AS oc
        FULL JOIN offices office ON office.id = oc.office_id
        INNER JOIN people p ON p.id = oc.person_id
        INNER JOIN profession_types pt ON pt.id = p.profession_type_id
        WHERE oc.month = $1 AND oc.year = $2
        GROUP BY oc.office_id, office.id;
      `,
      [month, year],
    );

    return officeMonthCosts;
  }
}
