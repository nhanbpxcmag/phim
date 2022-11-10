import { ERROR } from './../../constants';
import { BadRequestException } from '@nestjs/common';
import fetch from 'node-fetch';
import e from 'express';

export type TTypeImageURL =
  | 'backdrop'
  | 'poster'
  | 'still'
  | 'profile'
  | 'profile_dienvien_movie'
  | 'profile_dienvien_avatar'
  | 'logo';
export type TTypeSizeImageURL =
  | 'original'
  | 'w300_and_h450_bestv2'
  | 'w138_and_h175_face'
  | 'w45'
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w300'
  | 'w342'
  | 'w500'
  | 'h632'
  | 'w780'
  | 'w1280';

export function getImageURL(id: string, type: TTypeImageURL) {
  // https://image.tmdb.org/t/p/w342/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg
  let url = 'https://image.tmdb.org/t/p/';
  let size: TTypeSizeImageURL = 'original';
  switch (type) {
    case 'poster': // avatar
      size = 'w342';
      break;
    case 'backdrop': //background
      size = 'original';
      break;
    case 'still':
      size = 'original';
      break;
    case 'profile':
      size = 'original';
    case 'profile_dienvien_movie':
      size = 'w138_and_h175_face'; //Hiển thị ở trang thông tin phim
    case 'profile_dienvien_avatar':
      size = 'w300_and_h450_bestv2'; //Hiển thị ở trang thong tin dien vien
      break;
    case 'logo':
      size = 'original';
      break;
    default:
    // code block
  }
  return url + size + '/' + id;
}
export async function tmdb_get_movie(id_tmdb: number): Promise<ITmdb_movie> {
  const { TMDB_API, TMDB_API_V3 } = process.env;
  const url = `${TMDB_API}movie/${id_tmdb}?api_key=${TMDB_API_V3}&language=vi`;
  try {
    const response = await fetch(url, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json();
    if (json?.success === false) {
      throw ERROR.TMDB.ERROR_MOVIE_TV_NOT_EXIST.code;
    }
    return json;
  } catch (error) {
    console.log(error);
    if (error === ERROR.TMDB.ERROR_MOVIE_TV_NOT_EXIST.code) {
      throw new BadRequestException(
        ERROR.TMDB.ERROR_MOVIE_TV_NOT_EXIST.msg,
        ERROR.TMDB.ERROR_MOVIE_TV_NOT_EXIST.code,
      );
    } else {
      throw new BadRequestException(
        ERROR.TMDB.ERROR_MOVIE_TV.msg,
        ERROR.TMDB.ERROR_MOVIE_TV.code,
      );
    }
  }
}
export async function tmdb_get_tv(id_tmdb: number): Promise<ITmdb_tv> {
  const { TMDB_API, TMDB_API_V3 } = process.env;
  const url = `${TMDB_API}tv/${id_tmdb}?api_key=${TMDB_API_V3}&language=vi`;
  try {
    const response = await fetch(url, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json();
    if (json?.success === false) {
      throw ERROR.TMDB.ERROR_MOVIE_TV_NOT_EXIST.code;
    }
    return json;
  } catch (error) {
    console.log(error);
    if (error === ERROR.TMDB.ERROR_MOVIE_TV_NOT_EXIST.code) {
      throw new BadRequestException(
        ERROR.TMDB.ERROR_MOVIE_TV_NOT_EXIST.msg,
        ERROR.TMDB.ERROR_MOVIE_TV_NOT_EXIST.code,
      );
    } else {
      throw new BadRequestException(
        ERROR.TMDB.ERROR_MOVIE_TV.msg,
        ERROR.TMDB.ERROR_MOVIE_TV.code,
      );
    }
  }
}
export async function tmdb_get_tv_season_episode(
  id_tmdb: number,
  season_number: number,
): Promise<ITmdb_tv_season_episode> {
  const { TMDB_API, TMDB_API_V3 } = process.env;
  const url = `${TMDB_API}tv/${id_tmdb}/season/${season_number}?api_key=${TMDB_API_V3}&language=vi`;
  try {
    const response = await fetch(url, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json();
    if (json?.success === false) {
      throw ERROR.TMDB.ERROR_MOVIE_TV_NOT_EXIST.code;
    }
    return json;
  } catch (error) {
    console.log(error);
    if (error === ERROR.TMDB.ERROR_MOVIE_TV_NOT_EXIST.code) {
      throw new BadRequestException(
        ERROR.TMDB.ERROR_MOVIE_TV_NOT_EXIST.msg,
        ERROR.TMDB.ERROR_MOVIE_TV_NOT_EXIST.code,
      );
    } else {
      throw new BadRequestException(
        ERROR.TMDB.ERROR_MOVIE_TV.msg,
        ERROR.TMDB.ERROR_MOVIE_TV.code,
      );
    }
  }
}
export async function tmdb_get_movie_tv_dienvien(
  id_tmdb: number,
  type: TTypeGetMovieTV = 'movie',
): Promise<ITmdb_dienvien> {
  const { TMDB_API, TMDB_API_V3 } = process.env;
  const url = `${
    TMDB_API + type
  }/${id_tmdb}/credits?api_key=${TMDB_API_V3}&language=vi`;
  try {
    const response = await fetch(url, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (error) {
    console.log(error);
    throw new BadRequestException(
      ERROR.TMDB.ERROR_DIENVIEN_MOVIE_TV.msg,
      ERROR.TMDB.ERROR_DIENVIEN_MOVIE_TV.code,
    );
  }
}
export async function tmdb_get_movie_tv_tuongtu(
  id_tmdb: number,
  type: TTypeGetMovieTV = 'movie',
): Promise<ITmdb_tuongtu> {
  const { TMDB_API, TMDB_API_V3 } = process.env;
  const url = `${
    TMDB_API + type
  }/${id_tmdb}/recommendations?api_key=${TMDB_API_V3}&language=vi`;
  try {
    const response = await fetch(url, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (error) {
    console.log(error);
    throw new BadRequestException(
      ERROR.TMDB.ERROR_TUONGTU_MOVIE_TV.msg,
      ERROR.TMDB.ERROR_TUONGTU_MOVIE_TV.code,
    );
  }
}
