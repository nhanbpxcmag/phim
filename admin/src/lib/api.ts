// @ts-ignore
import { PUBLIC_PORT_API } from "$env/static/public";
import axios from "axios";

export const api_get_all_movie = (hostname: string) => {
  const url = `http://${hostname}:${PUBLIC_PORT_API}/phim/all/movie`;
  try {
    return axios.get<ResponseDataSuccess_Phim_Movie>(url);
  } catch (error) {
    console.log(error, "api_get_movie");
  }
};
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
  try {
    return axios.get(url);
  } catch (error) {
    console.log(error, "api_get_movie");
  }
};
export const api_add = async (hostname: string, tmdb_id: number, link: string,link_sub:string, type: "movie" | "tv" = "movie") => {
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
    if (new_phim.data.data.id) {
      await axios.post(url_add_link, {
        id_phim_or_episode: new_phim.data.data.id,
        type,
        link_stream: link,link_sub
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
export const api_add_bd = async (hostname: string, ten:string, avatar:string, link: string,link_sub:string|null) => {
  const url = `http://${hostname}:${PUBLIC_PORT_API}/bd/add`;
  try {
    const new_phim = await axios.post(url, {
      ten,
      avatar,
      linkstream: link,link_sub
    });
    alert("Thêm thành công");
    return new_phim;
  } catch (error: any) {
    if (error?.response?.data?.message) {
      console.log(error?.response?.data?.message);
    } 
    alert("Thêm thất bại");
    console.log(error, "api_add_bd");
  }
};
export const api_get_all_bd = (hostname: string) => {
  const url = `http://${hostname}:${PUBLIC_PORT_API}/bd/home`;
  try {
    return axios.get<ResponseDataSuccess_BD>(url);
  } catch (error) {
    console.log(error, "api_get_all_bd");
  }
};
export const api_get_bd_by_id = (hostname: string, id: number) => {
  const url = `http://${hostname}:${PUBLIC_PORT_API}/bd/${id}`;
  try {
    return axios.get<any>(url);
  } catch (error) {
    console.log(error, "api_get_movie");
  }
};
export const api_delete_bd = (hostname: string, id: number) => {
  const url = `http://${hostname}:${PUBLIC_PORT_API}/bd/delete/${id}`;
  try {
    return axios.get<any>(url);
  } catch (error) {
    console.log(error, "api_delete_movie");
  }
};
