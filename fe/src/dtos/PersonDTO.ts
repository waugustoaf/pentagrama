import { ProfessionTypeDTO } from './ProfessionTypeDTO';

export interface PersonDTO {
  id: string;
  name: string;
  cpf: string;
  profession_type_id: string;
  profession_type: ProfessionTypeDTO;
}
