<script>
  import "../app.css";
  import { page } from "$app/stores";
  let home = "/";
  $: {
    home = $page.route.id === "/phim/[slug]" || $page.route.id === "/" ? "/" : "/bd";
  }
</script>

<div class="flex flex-col">
  <div class="header flex content-center items-center">
    <div class="flex justify-center h-11 mt-2 w-56">
      <!-- svelte-ignore a11y-missing-attribute -->
      <a href={home}><img class="object-contain" src="/logo_chu.png" /></a>
    </div>
    <!-- <div class="px-6 cursor-pointer hover:text-slate-900 hover:bg-slate-400">Tìm kiếm</div> -->
  </div>
  <div class="main"><slot /></div>
</div>

<style>
  :global(body) {
    @apply bg-zinc-800 text-zinc-300  overflow-auto;
    /* background-color: #2f3640; */
  }
</style>
