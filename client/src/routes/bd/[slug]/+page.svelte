<script lang="ts">
  import { IsIphone } from "$lib/utils";
  import Plyr from "plyr";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  export let eventsToEmit: any[] = [];
  export let options = { currentTrack: 0 };
  export let player = {};
  export let data: PageData;
  let refVideo: any;
  let plyrDiv: any;
  let is_iphone = false;

  onMount(async () => {
    is_iphone = IsIphone(window);
    if (!is_iphone || is_iphone) {
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
        fullscreen: { enabled: true, fallback: true, iosNative: true },
        autoplay: true,
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
      window.localStorage.setItem(`${data.data.data.id}:timebd`, refVideo.currentTime);
    }
  }
  function loadedmetadata() {
    refVideo.currentTime = window.localStorage.getItem(`${data.data.data.id}:timebd`) || 0;
  }
</script>

<div class="container mx-auto">
  <div bind:this={plyrDiv}>
    <video bind:this={refVideo} data-poster={data.data.data.avatar} playsinline controls crossorigin="anonymous">
      <source src={data.data.data.linkstream} />
      <track default={true} kind="captions" src={data.data.data.link_sub} srclang="vi" label="Viet" />
    </video>
  </div>
</div>
