import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Part } from '../../parts/entities/part.entity';

@Entity('oems')
export class OEM {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @ManyToMany(() => Part, (part) => part.oems)
  parts: Part[];
}
