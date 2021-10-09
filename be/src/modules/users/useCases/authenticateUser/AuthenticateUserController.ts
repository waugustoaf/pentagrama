import { celebrate, Segments } from 'celebrate';
import { Request, Response } from 'express';
import Joi from 'joi';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const data = await authenticateUserUseCase.execute({ username, password });

    return response.json(data);
  }

  validation() {
    return celebrate({
      [Segments.BODY]: {
        username: Joi.string().required(),
        password: Joi.string().required(),
      },
    });
  }
}

export default new AuthenticateUserController();
