import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListOfficesUseCase } from './ListOfficesUseCase';

class ListOfficeController {
  async handle(request: Request, response: Response) {
    const listOfficeUseCase = container.resolve(ListOfficesUseCase);

    const offices = await listOfficeUseCase.execute();

    return response.json(offices);
  }
}

export default new ListOfficeController();
