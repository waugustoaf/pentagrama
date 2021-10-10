import { celebrate, Segments } from 'celebrate';
import { Request, Response } from 'express';
import Joi from 'joi';
import { container } from 'tsyringe';
import { GetOfficeUseCase } from './GetOfficeUseCase';

class GetOfficeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: officeId } = request.params;

    const getOfficeUseCase = container.resolve(GetOfficeUseCase);

    const office = await getOfficeUseCase.execute(officeId);

    return response.json(office);
  }

  validate() {
    return celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().required(),
      },
    });
  }
}

export default new GetOfficeController();
