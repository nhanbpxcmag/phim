<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="flex w-screen">
  <div class="app-nav">
    <div class="flex justify-center h-11 mt-2">
      <!-- svelte-ignore a11y-missing-attribute -->
      <a href="/admin/phim"><img class="object-contain" src="/logo_chu.png" /></a>
    </div>
    <div class="flex flex-col mt-4 mx-2">
      <a href="/admin/phim">
        <div class="nav-item" class:active={$page.url.pathname === "/admin/phim"}>
          <i class="ri-arrow-drop-right-line" />
          <p>Phim</p>
        </div>
      </a>
      <a href="/admin/bd">
        <div class="nav-item" class:active={$page.url.pathname === "/admin/bd"}>
          <i class="ri-arrow-drop-right-line" />
          <p>BD</p>
        </div>
      </a>
      <a href="/admin/tv">
        <div class="nav-item" class:active={$page.url.pathname === "/admin/tv"}>
          <i class="ri-arrow-drop-right-line" />
          <p>TV</p>
        </div>
      </a>
    </div>
  </div>
  <div class="app-content">
    <div class="app-content-header" />
    <div class="app-content-body"><slot /></div>
  </div>
</div>

<style>
  .app-nav {
    @apply bg-zinc-900 flex-auto;
    display: flex;
    flex-direction: column;
    width: 260px;
    min-height: 100vh;
  }
  .app-content {
    @apply flex-none;
    display: flex;
    flex-direction: column;
    width: calc(100vw - 260px);
  }
  .app-content-header {
    @apply bg-stone-900;
    height: 10px;
    width: 100%;
  }
  .app-content-body {
    display: flex;
    justify-content: center;
    margin: 20px;
  }

  .nav-item {
    display: flex;
    padding: 10px 4px;
    cursor: pointer;
  }
  .nav-item:hover {
    @apply text-stone-300 bg-zinc-700 rounded;
  }
  .nav-item.active {
    @apply text-stone-300 bg-zinc-700 rounded;
  }
  .nav-item i {
    margin-right: 10px;
  }
</style>
