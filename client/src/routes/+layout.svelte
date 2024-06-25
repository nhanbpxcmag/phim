<script>
  import "../app.css";
  import { page } from "$app/stores";
  let home = "/";
  $: {
    home = $page.route.id === "/phim/[slug]" || $page.route.id === "/" ? "/" : "/bd";
  }
</script>

<div class="flex flex-col h-screen">
  <div class="flex items-center content-center header h-[52px]">
    <div class="flex justify-center w-56 mt-2 h-11">
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
