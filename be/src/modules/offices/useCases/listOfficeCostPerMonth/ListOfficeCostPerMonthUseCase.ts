import { IOfficeCostsRepository } from '@modules/offices/repositories/IOfficeCostsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  month: number;
  year: number;
}

@injectable()
export class ListOfficeCostPerMonthUseCase {
  constructor(
    @inject('OfficeCostsRepository')
    private officeCostsRepository: IOfficeCostsRepository,
  ) {}

  private formatCurrency = (amount: number | string) =>
    Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
      Number(amount),
    );

  async execute({ month, year }: IRequest) {
    const response = await this.officeCostsRepository.getOfficeMonthCosts({
      month,
      year,
    });

    const listOfficeCostPerMonth = response.map(
      ({ office_cost, office_id, ...rest }) => ({
        id: office_id,
        cost: this.formatCurrency(office_cost),
        office: rest,
      }),
    );

    return listOfficeCostPerMonth;
  }
}
