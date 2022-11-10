import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class addLoaiphimInput {
  @IsNotEmpty()
  @IsString()
  ten: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  stt?: number;
}
export class findLoaiphimInput {
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

export class updateLoaiphimParam {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
export class updateLoaiphimInput {
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
