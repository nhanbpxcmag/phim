// @ts-ignore
import { PUBLIC_PORT_API } from "$env/static/public";
import axios from "axios";

export const api_get_movie = (hostname: string) => {
  const url = `http://${hostname}:${PUBLIC_PORT_API}/phim/all/movie`;
  try {
    return axios.get<ResponseDataSuccess_Phim_Movie>(url);
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

export function getImageURL(id: string, type: TTypeImageURL) {
  // https://image.tmdb.org/t/p/w342/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg
  let url = "https://image.tmdb.org/t/p/";
  let size: TTypeSizeImageURL = "original";
  switch (type) {
    case "poster": // avatar
      size = "w342";
      break;
    case "backdrop": //background
      size = "original";
      break;
    case "still":
      size = "original";
      break;
    case "profile":
      size = "original";
    case "profile_dienvien_movie":
      size = "w138_and_h175_face"; //Hiển thị ở trang thông tin phim
    case "profile_dienvien_avatar":
      size = "w300_and_h450_bestv2"; //Hiển thị ở trang thong tin dien vien
      break;
    case "logo":
      size = "original";
      break;
    default:
    // code block
  }
  return url + size + "/" + id;
}
