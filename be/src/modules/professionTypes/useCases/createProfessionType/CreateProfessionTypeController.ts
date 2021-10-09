import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProfessionTypeUseCase } from './CreateProfessionTypeUseCase';
import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';

class CreateProfessionTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, monthly_wage } = request.body;

    const createProfessionTypeUseCase = container.resolve(
      CreateProfessionTypeUseCase,
    );

    const professionType = await createProfessionTypeUseCase.execute({
      name,
      monthly_wage: Number(monthly_wage),
    });

    return response.status(201).json(professionType);
  }

  validation() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        monthly_wage: Joi.number().required(),
      },
    });
  }
}

export default new CreateProfessionTypeController();
