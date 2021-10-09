import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteOfficeUseCase } from './DeleteOfficeUseCase';

class DeleteOfficeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: officeId } = request.params;

    const deleteOfficeUseCase = container.resolve(DeleteOfficeUseCase);

    await deleteOfficeUseCase.execute(officeId);

    return response.sendStatus(204);
  }
}

export default new DeleteOfficeController();
