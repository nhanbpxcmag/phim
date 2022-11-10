import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Loaiphim {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ten: string;

  @Column({ default: 9999 })
  stt?: number;

  @Column({ default: true })
  isActive: boolean;
}
