import { Person } from '@modules/people/infra/typeorm/entities/Person';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Office } from './Office';
import { v4 as uuid } from 'uuid';

@Entity('office_costs')
export class OfficeCost {
  @PrimaryColumn()
  id: string;

  @Column()
  person_id: string;

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column()
  office_id: string;

  @ManyToOne(() => Office)
  @JoinColumn({ name: 'office_id' })
  office: Office;

  @Column()
  hours: number;

  @Column()
  month: number;

  @Column()
  year: number;

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
