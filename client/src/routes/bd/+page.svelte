<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div class="container mx-auto">
  <div class="grid grid-cols-2 gap-4 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3">
    <!-- svelte-ignore empty-block -->
    {#each data.phim as phim}
      <!-- svelte-ignore a11y-missing-attribute -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a href={"/bd/" + phim.id}>
        <div class="flex flex-col cursor-pointer">
          <img class="h-36 w-56" src={phim.avatar} />
          <div>{phim.ten}</div>
        </div>
      </a>
    {/each}
  </div>
</div>
