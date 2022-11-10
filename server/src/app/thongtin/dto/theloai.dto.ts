import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class addTheloaiInput {
  @IsNotEmpty()
  @IsString()
  ten: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  stt?: number;
}
export class findTheloaiInput {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;

  @IsOptional()
  @IsString()
  ten?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  stt?: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive?: boolean;
}

export class updateTheloaiParam {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
export class updateTheloaiInput {
  @IsOptional()
  @IsString()
  ten?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  stt?: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive?: boolean;
}
