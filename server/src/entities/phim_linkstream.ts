import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Phim } from './phim.entity';
import { Phim_tv_season_episode } from './phim_tv_season_episode';

@Entity()
export class Phim_linkstream {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  linkstream: string;

  @Column({ nullable: true })
  link_sub: string;

  @OneToOne(() => Phim, { nullable: true })
  @JoinColumn({ name: 'phimId' })
  phim: Phim;

  @OneToOne(() => Phim_tv_season_episode, { nullable: true })
  @JoinColumn({ name: 'phim_tv_season_episodeId' })
  phim_tv_season_episode: Phim_tv_season_episode;
}
