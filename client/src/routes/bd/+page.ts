import { api_get_all_bd } from "./../../../../admin/src/lib/api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, url }) => {
  const data = await api_get_all_bd(url.hostname);
  return {
    phim: data?.data.data as BD[],
  };
};
