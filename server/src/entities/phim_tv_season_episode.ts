import { Phim_tv_season } from './phim_tv_season';
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
export class Phim_tv_season_episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tmdb_id: number;

  @Column({ nullable: true })
  air_date: Date; //tmdb: character

  @Column()
  episode_number: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  overview: string;

  @Column({ nullable: true })
  runtime: number;

  @ManyToOne(() => Phim_tv_season)
  @JoinColumn({ name: 'phim_tv_seasonId' })
  phim_tv_season: Phim_tv_season;
}
