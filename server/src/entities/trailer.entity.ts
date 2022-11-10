import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Phim } from './phim.entity';

@Entity()
///&append_to_response=videos
export class Phim_trailer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ten: string;

  @Column()
  site: string;

  @Column()
  key: string;

  @Column()
  type: string;

  @Column()
  official: boolean;

  @Column()
  published_at: Date;

  @Column()
  tmdb_id: string;

  @OneToOne(() => Phim)
  @JoinColumn({ name: 'phimId' })
  phim: Phim;
}
