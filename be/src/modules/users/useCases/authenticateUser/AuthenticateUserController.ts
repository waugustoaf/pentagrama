import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const data = await authenticateUserUseCase.execute({ username, password });

    return response.json(data);
  }
}

export default new AuthenticateUserController();