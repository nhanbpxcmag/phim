import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Dienvien } from './dienvien.entity';
import { Phim } from './phim.entity';

@Entity()
@Unique(['phim', 'dienvien'])
export class Phim_dienvien {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  vai_dien: string; //tmdb: character

  @Column()
  stt: number;

  @Column({ nullable: true })
  tmdb_credit_id: string;

  @ManyToOne(() => Phim)
  @JoinColumn({ name: 'phimId' })
  phim: Phim;

  @ManyToOne(() => Dienvien)
  @JoinColumn({ name: 'dienvienId' })
  dienvien: Dienvien;
}
