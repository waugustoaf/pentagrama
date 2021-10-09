import { ICreateOfficeDTO } from '@modules/offices/dtos/ICreateOfficeDTO';
import { IOfficesRepository } from '@modules/offices/repositories/IOfficesRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateOfficeUseCase {
  constructor(
    @inject('OfficesRepository')
    private officesRepository: IOfficesRepository,
  ) {}

  async execute(data: ICreateOfficeDTO) {
    const officeAlreadyExists = await this.officesRepository.findByName(
      data.name,
    );

    if (officeAlreadyExists) {
      throw new AppError('Office already exits!');
    }

    const office = await this.officesRepository.create(data);

    return office;
  }
}
