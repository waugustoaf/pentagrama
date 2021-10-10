import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetSessionInfoUseCase } from './GetSessionInfoUseCase';

class GetSessionInfoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const getSessionInfoUseCase = container.resolve(GetSessionInfoUseCase);

    const user = await getSessionInfoUseCase.execute(userId);

    return response.json(user);
  }
}

export default new GetSessionInfoController();
