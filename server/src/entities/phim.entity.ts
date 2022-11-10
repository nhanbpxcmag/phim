import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Loaiphim } from './loaiphim.entity';
import { Quocgia } from './quocgia.entity';

@Entity()
@Unique(['tmdb_id', 'tmdb_type'])
export class Phim {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ten: string; //tmdb: movie -> title; tv -> name

  @Column({ nullable: true })
  ten_en: string; //tmdb: movie -> original_title; tv -> original_name

  @Column({ nullable: true })
  mota: string; //tmdb: overview

  @Column({ nullable: true })
  avatar: string; //tmdb: poster_path

  @Column({ nullable: true })
  background: string; //tmdb: backdrop_path

  @Column({ nullable: true })
  tagline: string; //khẩu hiệu

  @Column({ nullable: true })
  release_date: Date;

  @Column()
  nam: number;

  @ManyToOne(() => Quocgia)
  @JoinColumn()
  quocgia: Quocgia;

  @ManyToOne(() => Loaiphim)
  @JoinColumn()
  loaiphim: Loaiphim;

  @Column({ nullable: true })
  imdb_id: string; //tmdb: id

  @Column({ type: 'float', nullable: true })
  tmdb_id: number; //tmdb: id

  @Column({ nullable: true })
  tmdb_type: 'movie' | 'tv'; //tmdb: movie hoac tv

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
