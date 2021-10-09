import { IPeopleRepository } from '@modules/people/infra/repositories/IPeopleRepository';
import { Person } from '@modules/people/infra/typeorm/entities/Person';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListPeopleUseCase {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
  ) {}

  async execute(): Promise<Person[]> {
    return await this.peopleRepository.list();
  }
}
