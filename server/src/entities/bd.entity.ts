import {
  Column,
  CreateDateColumn,
  Entity, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity()
export class BD {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ten: string; //tmdb: movie -> title; tv -> name

  @Column({ nullable: true })
  avatar: string; //tmdb: poster_path

  @Column({ nullable: true })
  linkstream: string;

  @Column({ nullable: true })
  link_sub: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
