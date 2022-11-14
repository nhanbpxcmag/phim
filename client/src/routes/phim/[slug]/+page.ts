import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { api_get_movie_by_id } from "./../../../../../admin/src/lib/api";

export const load: PageLoad = async ({ params, url }) => {
  const id = parseInt(params.slug, 10);
  if (isNaN(id)) {
    throw error(404, "Trang không tồn tại");
  }
  const api = await api_get_movie_by_id(url.hostname, id);
  return api;
};
