import { Type } from 'class-transformer';
import {
  IsArray,
  isArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransformerArrayNumber } from 'src/pipes/transformer.custom';
import { IsArrayNumber } from 'src/pipes/validator.custom';

export class findPhimInput {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;

  @IsOptional()
  @IsString()
  ten?: string;
}

export class addPhimInput {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  tmdb_id: number;

  @IsNotEmpty()
  @IsEnum(['movie', 'tv'])
  type: 'movie' | 'tv';

  @IsNotEmpty()
  @IsArray()
  @IsArrayNumber()
  @TransformerArrayNumber()
  theloaiId: number[];

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quocgiaId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  loaiphimId: number;
}

export class addLinkstreamInput {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id_phim_or_episode: number;

  @IsNotEmpty()
  @IsEnum(['movie', 'tv'])
  type: 'movie' | 'tv';

  @IsNotEmpty()
  @IsString()
  link_stream: string;
}
