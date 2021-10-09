import { celebrate, Segments } from 'celebrate';
import { Request, Response } from 'express';
import Joi from 'joi';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      username,
      password,
    });

    return response.status(201).json(user);
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

// Aqui eu exporto como default porque no NodeJS ele reconhece o que quero fazer e já cria um Singleton
// Portanto, não instância toda vez que é chamado
export default new CreateUserController();
