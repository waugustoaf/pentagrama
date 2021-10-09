import { ProfessionType } from '@modules/professionTypes/infra/typeorm/entities/ProfessionType';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('people')
export class Person {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  profession_type_id: string;

  @ManyToOne(() => ProfessionType, { eager: true })
  @JoinColumn({ name: 'profession_type_id' })
  profession_type: ProfessionType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
