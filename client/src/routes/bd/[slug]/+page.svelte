<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import PlayVideo from "$lib/PlayVideo.svelte";
  export let data: PageData;
</script>

<PlayVideo
  name_time={`${$page.params.slug}:timebd`}
  poster={data.data.data.avatar}
  source={data.data.data.linkstream}
  track={data.data.data.link_sub}
  ten={data.data.data.ten}
/>
