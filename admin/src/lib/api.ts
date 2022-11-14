// @ts-ignore
import { PUBLIC_PORT_API } from "$env/static/public";
import axios from "axios";

export const api_get_movie = (hostname: string) => {
  const url = `http://${hostname}:${PUBLIC_PORT_API}/phim/home/movie`;
  try {
    return axios.get<ResponseDataSuccess_Phim_Movie>(url);
  } catch (error) {
    console.log(error, "api_get_movie");
  }
};
export const api_get_movie_by_id = (hostname: string, id: number) => {
  const url = `http://${hostname}:${PUBLIC_PORT_API}/phim/detail_linkstream/${id}`;
  console.log(url);
  try {
    return axios.get(url);
  } catch (error) {
    console.log(error, "api_get_movie");
  }
};
export const api_add = async (hostname: string, tmdb_id: number, link: string, type: "movie" | "tv" = "movie") => {
  const url = `http://${hostname}:${PUBLIC_PORT_API}/phim/add`;
  const url_add_link = `http://${hostname}:${PUBLIC_PORT_API}/phim/add_link_stream`;
  try {
    const new_phim = await axios.post(url, {
      tmdb_id,
      type,
      theloaiId: [1],
      quocgiaId: 1,
      loaiphimId: 1,
    });
    if (new_phim.data.id) {
      await axios.post(url_add_link, {
        id_phim_or_episode: new_phim.data.id,
        type,
        link_stream: link,
      });
    }
    alert("Thêm thành công");
    return new_phim;
  } catch (error: any) {
    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    } else {
      alert("Thêm thất bại");
    }
    console.log(error, "api_add");
  }
};
export const api_delete_movie = (hostname: string, id: number) => {
  const url = `http://${hostname}:${PUBLIC_PORT_API}/phim/delete/${id}`;
  try {
    return axios.get<ResponseDataSuccess_Phim_Movie>(url);
  } catch (error) {
    console.log(error, "api_delete_movie");
  }
};
