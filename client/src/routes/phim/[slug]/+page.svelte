<script lang="ts">
  import { getImageURL } from "$lib/api";
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import Plyr from "plyr";

  export let eventsToEmit: any[] = [];
  export let options = {};
  export let player = {};
  let plyrDiv: any;
  const dispatch = createEventDispatcher();

  $: opts();

  function opts() {
    if (!options.hasOwnProperty("hideYouTubeDOMError")) {
      options.hideYouTubeDOMError = true;
    }
    return options;
  }

  onMount(async () => {
    player = new Plyr(plyrDiv.firstChild, opts);
    eventsToEmit.forEach((event) => dispatchOnPlayerEvent(event));
  });

  function dispatchOnPlayerEvent(event) {
    player.on(event, (data) => dispatch(event, data.detail.plyr));
  }
  export let data: PageData;
</script>

<div class="container mx-auto">
  <div bind:this={plyrDiv}>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video data-poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg" playsinline controls>
      <source src="http://192.168.31.215:6789/phim/The.Revenant.2015.mp4" />
      <track
        default
        kind="subtitles"
        src="http://192.168.31.215:6789/phim/The.Revenant.2015.vi.vtt"
        srclang="vi"
        label="Viet"
      />
    </video>
  </div>
  <!-- <video width="800" height="500" controls>
    <source src="http://192.168.31.215:6789/phim/The.Revenant.2015.mp4" type="video/mp4" />
  </video> -->
</div>
