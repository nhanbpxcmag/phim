import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quocgia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ten: string;

  @Column({ default: 9999 })
  stt?: number;

  @Column({ default: true })
  isActive: boolean;
}
