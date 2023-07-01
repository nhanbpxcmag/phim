<script lang="ts">
  import { IsIphone } from "$lib/utils";
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import Plyr from "plyr";
  import { Player, Video, DefaultUi } from "@vime/svelte";
  import { page } from "$app/stores";

  export let poster: string;
  export let source: string;
  export let track: string;
  export let name_time: string;
  let player: Plyr;
  let has_set = false;
  let refVideo: any;
  let plyrDiv: any;
  let is_iphone = false;
  let home = "/";
  $: {
    home = $page.route.id === "/phim/[slug]" || $page.route.id === "/" ? "/" : "/bd";
  }
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
      player.currentTime = getlocal();
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
    if (window && has_set && refVideo?.currentTime) {
      window.localStorage.setItem(name_time, refVideo?.currentTime);
    }
  }
  function loadedmetadata() {
    if (window) {
      refVideo.currentTime = getlocal();
    }
  }
  function getlocal() {
    let temp = parseFloat(window.localStorage.getItem(name_time) as any);
    return !isNaN(temp) ? temp : 0;
  }
</script>

<a
  href={home}
  class="fixed top-[50vh] left-5 rounded-full bg-slate-200 text-slate-800 h-10 w-10 flex justify-center content-center text-center items-center font-bold"
  >Back</a
>
<div class="container mx-auto">
  <div bind:this={plyrDiv}>
    <video
      bind:this={refVideo}
      on:canplay={() => {
        if (!has_set && refVideo?.currentTime) {
          loadedmetadata();
        }
        has_set = true;
      }}
      data-poster={poster}
      playsinline
      controls
      crossorigin="anonymous"
    >
      <source src={source} />
      <track default={true} kind="captions" src={track} srclang="vi" label="Viet" />
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
