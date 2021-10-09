import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetUserInfoUseCase } from './GetUserInfoUseCase';

class GetUserInfoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const getUserInfoUseCase = container.resolve(GetUserInfoUseCase);

    const user = await getUserInfoUseCase.execute(userId);

    return response.json(user);
  }
}

export default new GetUserInfoController();
