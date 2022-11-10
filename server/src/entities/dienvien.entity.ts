import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Dienvien {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  tmdb_id: number; //tmdb: id

  @Column()
  ten: string; //tmdb: original_name

  @Column({ nullable: true })
  profile_path: string; //tmdb: profile_path

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
