<script lang="ts">
  import { IsIphone } from "$lib/utils";
  import type { PageData } from "./$types";
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import Plyr from "plyr";
  import { Player, Video, DefaultUi } from "@vime/svelte";
  import { page } from "$app/stores";

  export let eventsToEmit: any[] = [];
  export let options = { currentTrack: 0 };
  export let player = {};
  export let data: PageData;
  let refVideo: any;
  let plyrDiv: any;
  let is_iphone = false;

  onMount(async () => {
    is_iphone = IsIphone(window);
    if (!is_iphone) {
      player = new Plyr(plyrDiv.firstChild, {
        captions: { active: true, language: "vi" },
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
      });
      // eventsToEmit.forEach((event) => dispatchOnPlayerEvent(event));
    }

    refVideo.addEventListener("timeupdate", timeupdate);
    refVideo.addEventListener(
      "loadeddata",
      function () {
        loadedmetadata();
      },
      false,
    );
  });
  function timeupdate() {
    if (window) {
      window.localStorage.setItem(`${$page.params.slug}:timebd`, refVideo.currentTime);
    }
  }
  function loadedmetadata() {
    refVideo.currentTime = window.localStorage.getItem(`${$page.params.slug}:timebd`) || 0;
  }
</script>

<div class="container mx-auto">
  <div bind:this={plyrDiv}>
    <video
      bind:this={refVideo}
      data-poster={data.data.data.phim.background}
      playsinline
      controls
      crossorigin="anonymous"
    >
      <source src={data.data.data.linkstream.Phim_linkstream_linkstream} />
      <track
        default={true}
        kind="captions"
        src={data.data.data.linkstream.Phim_linkstream_link_sub}
        srclang="vi"
        label="Viet"
      />
    </video>
  </div>
  <!-- <Player theme="dark" style="--vm-player-theme: #e86c8b;">
    <Video crossOrigin="anonymous" poster="https://media.vimejs.com/poster.png">
      <source data-src={`http://192.168.31.215:1993/static2/Eternals.2021.mp4`} type="video/mp4" />
      <track
        default
        kind="subtitles"
        src={`${data.data.data.linkstream.Phim_linkstream_linkstream}`}
        srclang="en"
        label="English"
      />
    </Video>

    <DefaultUi />
  </Player> -->
</div>
