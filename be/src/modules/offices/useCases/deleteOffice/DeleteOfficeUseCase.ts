import { IOfficesRepository } from '@modules/offices/repositories/IOfficesRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

@injectable()
export class DeleteOfficeUseCase {
  constructor(
    @inject('OfficesRepository')
    private officesRepository: IOfficesRepository,
  ) {}

  async execute(officeId: string): Promise<void> {
    if (!validate(officeId)) {
      throw new AppError('Invalid office ID');
    }

    const officeAlreadyExists = await this.officesRepository.findById(officeId);

    if (!officeAlreadyExists) {
      throw new AppError('Invalid office ID');
    }

    await this.officesRepository.delete(officeAlreadyExists.id);
  }
}
