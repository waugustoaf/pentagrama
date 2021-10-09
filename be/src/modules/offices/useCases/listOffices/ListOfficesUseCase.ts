import { Office } from '@modules/offices/infra/typeorm/entities/Office';
import { IOfficesRepository } from '@modules/offices/repositories/IOfficesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListOfficesUseCase {
  constructor(
    @inject('OfficesRepository')
    private officesRepository: IOfficesRepository,
  ) {}

  async execute(): Promise<Office[]> {
    const offices = this.officesRepository.list();

    return offices;
  }
}
