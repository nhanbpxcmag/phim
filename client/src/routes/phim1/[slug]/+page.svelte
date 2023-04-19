<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import Plyr from "plyr";
  import videojs from "video.js";

  export let eventsToEmit: any[] = [];
  export let options = { currentTrack: 0 };
  export let player = {};
  export let data: PageData;
  let refVideo: any;
  let plyrDiv: any;
  const dispatch = createEventDispatcher();

  onMount(async () => {
    var options = {
      controls: [
        "play-large",
        "restart",
        "rewind",
        "play",
        "fast-forward",
        "progress",
        "current-time",
        "duration",
        "mute",
        "volume",
        // "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
    };

    var player = videojs(plyrDiv.firstChild, options, function onPlayerReady() {
      videojs.log("Your player is ready!");
    });
  });
</script>

<div class="container mx-auto h-screen">
  <div class="w-full h-full" bind:this={plyrDiv}>
    <video
      bind:this={refVideo}
      data-poster={data.data.data.phim.background}
      playsinline
      controls
      crossorigin="anonymous"
      id="my-player"
      class="video-js w-2/3 h-2/3"
    >
      <!-- <source src="http://192.168.31.215:1993/static/hls/phim.m3u8" type="application/x-mpegURL" /> -->
      <!-- <source src="http://192.168.31.215:1993/static/peaky.mkv" type="video/mp4" /> -->
      <source src={data.data.data.linkstream.Phim_linkstream_linkstream} type="video/mp4" />
      <track
        default={true}
        kind="captions"
        src={data.data.data.linkstream.Phim_linkstream_link_sub}
        srclang="vi"
        label="Viet"
        size={100}
      />
    </video>
  </div>
</div>
