import { celebrate, Segments } from 'celebrate';
import { Request, Response } from 'express';
import Joi from 'joi';
import { container } from 'tsyringe';
import { CreateOfficeUseCase } from './CreateOfficeUseCase';

class CreateOfficeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, address } = request.body;

    const createOfficeUseCase = container.resolve(CreateOfficeUseCase);

    const office = await createOfficeUseCase.execute({
      name,
      description,
      address,
    });

    return response.status(201).json(office);
  }

  validation() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        description: Joi.string().required(),
        address: Joi.string().required(),
      },
    });
  }
}

export default new CreateOfficeController();
