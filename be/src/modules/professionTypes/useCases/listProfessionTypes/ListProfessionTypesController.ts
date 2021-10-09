import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListProfessionTypesUseCase } from './ListProfessionTypesUseCase';

class ListProfessionTypesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listProfessionTypesUseCase = container.resolve(
      ListProfessionTypesUseCase,
    );

    const professionTypes = await listProfessionTypesUseCase.execute();

    return response.json(professionTypes);
  }
}

export default new ListProfessionTypesController();
