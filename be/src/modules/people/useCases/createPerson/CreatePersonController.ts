import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreatePersonUseCase } from './CreatePersonUseCase';
import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';

class CreatePersonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf, profession_type_id } = request.body;

    const createPersonUseCase = container.resolve(CreatePersonUseCase);

    const person = await createPersonUseCase.execute({
      name,
      cpf,
      profession_type_id,
    });

    return response.status(201).json(person);
  }

  validate() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        cpf: Joi.string().required(),
        profession_type_id: Joi.string().required(),
      },
    });
  }
}

export default new CreatePersonController();
