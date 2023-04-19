// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Locals {}
  // interface PageData {}
  // interface Error {}
  // interface Platform {}
}
type TTypeImageURL =
  | "backdrop"
  | "poster"
  | "still"
  | "profile"
  | "profile_dienvien_movie"
  | "profile_dienvien_avatar"
  | "logo";
type TTypeSizeImageURL =
  | "original"
  | "w300_and_h450_bestv2"
  | "w138_and_h175_face"
  | "w45"
  | "w92"
  | "w154"
  | "w185"
  | "w300"
  | "w342"
  | "w500"
  | "h632"
  | "w780"
  | "w1280";
type ResponseDataSuccess<T> = {
  data: T;
  status: "success";
  timestamp: Date;
};
interface DataPhim_Movie {
  phim_id: number;
  phim_ten: string;
  phim_ten_en: string;
  phim_mota: string;
  phim_avatar: string;
  phim_background: string;
  phim_tagline: string;
  phim_release_date: Date;
  phim_nam: number;
  phim_imdb_id: string;
  phim_tmdb_id: number;
  phim_tmdb_type: "movie" | "tv";
  phim_isActive: boolean;
  phim_created_at: Date;
  phim_updated_at: Date;
  phim_linkstream_id: number;
  phim_linkstream_linkstream: string;
  phim_linkstream_phimId: number;
  phim_linkstream_phim_tv_season_episodeId: number;
}
type ResponseDataSuccess_Phim_Movie = ResponseDataSuccess<DataPhim_Movie[]>;

interface BD{
  id:number;
  ten: string;
  avatar: string;
  linkstream: string;

  link_sub: string;
}

type ResponseDataSuccess_BD= ResponseDataSuccess<BD[]>;
