<script lang="ts">
  import { page } from "$app/stores";
  import PlayVideo from "$lib/PlayVideo.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  console.log(data.data.data.phim);
</script>

<PlayVideo
  name_time={`${$page.params.slug}:time`}
  poster={data.data.data.phim.background}
  source={data.data.data.linkstream.Phim_linkstream_linkstream}
  track={data.data.data.linkstream.Phim_linkstream_link_sub}
  ten={data.data.data.phim.ten}
/>
