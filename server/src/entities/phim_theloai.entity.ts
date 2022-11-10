import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Phim } from './phim.entity';
import { Theloai } from './theloai.entity';

@Entity()
@Unique(['phim', 'theloai'])
export class Phim_theloai {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Phim)
  @JoinColumn({ name: 'phimId' })
  phim: Phim;

  @ManyToOne(() => Theloai)
  @JoinColumn({ name: 'theloaiId' })
  theloai: Theloai;
}
