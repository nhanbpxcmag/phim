import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class addQuocgiaInput {
  @IsNotEmpty()
  @IsString()
  ten: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  stt?: number;
}
export class findQuocgiaInput {
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

export class updateQuocgiaParam {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
export class updateQuocgiaInput {
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
