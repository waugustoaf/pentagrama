import { celebrate, Segments } from 'celebrate';
import { Request, Response } from 'express';
import Joi from 'joi';
import { container } from 'tsyringe';
import { ListOfficeCostPerMonthUseCase } from './ListOfficeCostPerMonthUseCase';

class ListOfficeCostPerMonthController {
  async handle(request: Request, response: Response) {
    const { query } = request;

    const month = Number(query.month);
    const year = Number(query.year);

    const listOfficeCostPerMonthUseCase = container.resolve(
      ListOfficeCostPerMonthUseCase,
    );

    const listOfficeCostPerMonth = await listOfficeCostPerMonthUseCase.execute({
      month,
      year,
    });

    return response.json(listOfficeCostPerMonth);
  }

  validate() {
    return celebrate({
      [Segments.BODY]: {
        month: Joi.number().required(),
        year: Joi.number().required(),
      },
    });
  }
}

export default new ListOfficeCostPerMonthController();
