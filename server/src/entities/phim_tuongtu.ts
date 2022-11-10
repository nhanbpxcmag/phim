import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Phim } from './phim.entity';

@Entity()
@Unique(['phim_tuongtu', 'phim'])
export class Phim_tuongtu {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Phim)
  @JoinColumn({ name: 'phimId_tuongtu' })
  phim_tuongtu: Phim; //id phim tuong tu

  @ManyToOne(() => Phim)
  @JoinColumn({ name: 'phimId' })
  phim: Phim; //id phim chinh, where cot nay
}
