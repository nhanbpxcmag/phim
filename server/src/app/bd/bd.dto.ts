import {
    IsOptional,
    IsString
} from 'class-validator';

export class addBDInput {
  @IsString()
  ten: string;

  @IsString()
  avatar: string;

  @IsString()
  linkstream: string;

  @IsString()
  @IsOptional()
  link_sub: string;
}