import { IOfficesRepository } from '@modules/offices/repositories/IOfficesRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

@injectable()
export class GetOfficeUseCase {
  constructor(
    @inject('OfficesRepository')
    private officesRepository: IOfficesRepository,
  ) {}

  async execute(officeId: string) {
    if (!validate(officeId)) {
      throw new AppError('Invalid office UUID');
    }

    const office = await this.officesRepository.findById(officeId);

    if (!office) {
      throw new AppError('Unknown office ID');
    }

    return office;
  }
}
