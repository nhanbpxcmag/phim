<script lang="ts">
  import { getImageURL } from "$lib/api";
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";

  function goToPhim(id: number) {
    goto("/phim/" + id);
  }
  export let data: PageData;
</script>

<div class="container mx-auto">
  <div class="grid grid-cols-2 gap-4 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3">
    <!-- svelte-ignore empty-block -->
    {#each data.phim as phim}
      <!-- svelte-ignore a11y-missing-attribute -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="flex flex-col cursor-pointer" on:click={() => goToPhim(phim.phim_linkstream_id)}>
        <img src={getImageURL(phim.phim_avatar, "poster")} />
        <div>{phim.phim_ten_en}</div>
        <div class="opacity-50">{phim.phim_ten}</div>
      </div>
    {/each}
  </div>
</div>
