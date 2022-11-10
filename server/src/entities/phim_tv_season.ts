import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Phim } from './phim.entity';

@Entity()
export class Phim_tv_season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tmdb_id: number;

  @Column({ nullable: true })
  air_date: Date; //tmdb: character

  @Column()
  episode_count: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  overview: string;

  @Column({ nullable: true })
  poster_path: string;

  @Column({ nullable: true })
  season_number: number;

  @ManyToOne(() => Phim)
  @JoinColumn({ name: 'phimId' })
  phim: Phim;
}
