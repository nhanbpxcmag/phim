import { error } from "@sveltejs/kit";
import type { PageLoad } from "../../../../.svelte-kit/types/src/routes/phim/[slug]/$types";
import { api_get_bd_by_id } from "../../../../../admin/src/lib/api";

export const load: PageLoad = async ({ params, url }) => {
  const id = parseInt(params.slug, 10);
  if (isNaN(id)) {
    throw error(404, "Trang không tồn tại");
  }
  const api = await api_get_bd_by_id(url.hostname, id);
  if (!api?.data) {
    throw error(404, "Trang không tồn tại");
  }
  if (api.data.data.linkstream) {
    let link_url = new URL(api.data.data.linkstream);
    console.log("🚀 --- file: +page.ts:16 --- constload:PageLoad= --- link_url", link_url);
    link_url.hostname = url.hostname;
    link_url.protocol = "http:";
    api.data.data.linkstream = link_url.href;
  }
  if (api.data.data.link_sub) {
    let link_sub = new URL(api.data.data.link_sub);
    link_sub.hostname = url.hostname;
    link_sub.protocol = "http:";
    api.data.data.link_sub = link_sub.href;
  }
  return api;
};
// export const ssr = false;
