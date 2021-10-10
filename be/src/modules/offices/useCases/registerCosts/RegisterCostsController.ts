import { OfficeCost } from '@modules/offices/infra/typeorm/entities/OfficeCost';
import { celebrate, Segments } from 'celebrate';
import { Request, Response } from 'express';
import Joi from 'joi';
import { container } from 'tsyringe';
import { RegisterCostsUseCase } from './RegisterCostsUseCase';

interface RegisterProps {
  personId: string;
  officeId: string;
  hours: number;
}

class RegisterCostsController {
  private isOfficeCost = (object: any): object is OfficeCost[] => {
    if (object?.length === 0) {
      return true;
    }

    if (object?.length > 0) {
      return 'office_id' in object[0];
    }

    return '' in object;
  };

  handle = async (request: Request, response: Response): Promise<Response> => {
    const { body } = request;

    const month: number = body.month;
    const year: number = body.year;
    const registers: RegisterProps[] = body.registers;

    const registerCostsController = container.resolve(RegisterCostsUseCase);

    const registerCostsResponse = await registerCostsController.execute({
      month,
      year,
      registers,
    });

    if (!this.isOfficeCost(registerCostsResponse)) {
      return response
        .status(400)
        .json({
          error: 'Passthrough hours work limit',
          erroredPeople: registerCostsResponse,
        });
    }

    return response.status(201).json(registerCostsResponse);
  };

  validate() {
    return celebrate({
      [Segments.BODY]: {
        month: Joi.number().required(),
        year: Joi.number().required(),
        registers: Joi.array().required(),
      },
    });
  }
}

export default new RegisterCostsController();
