<script>
  import "../app.css";
  import "remixicon/fonts/remixicon.css";
</script>

<slot />

<style>
  :global(body) {
    @apply bg-zinc-800 text-zinc-200  overflow-auto;
    /* background-color: #2f3640; */
  }
</style>
