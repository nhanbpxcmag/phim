import { api_get_movie } from "./../../../admin/src/lib/api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, url }) => {
  const data = await api_get_movie(url.hostname);
  return {
    phim: data?.data.data as DataPhim_Movie[],
  };
};
