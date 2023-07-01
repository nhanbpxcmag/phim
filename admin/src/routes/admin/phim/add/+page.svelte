<script>
  import { api_add } from "$lib/api";
  import { page } from "$app/stores";
  /**
   * @type {string | undefined}
   */
  let tmdb_id = undefined;
  /**
   * @type {string | undefined}
   */
  let link = "http://192.168.31.222:1993/static/";
  /**
   * @type {string | undefined}
   */
  let link_sub = "http://192.168.31.222:1993/static/.vtt";
  async function add_phim() {
    if (!tmdb_id) {
      alert("Vui lòng nhập tmdb_id");
      return;
    }
    const tmdb_id_num = parseInt(tmdb_id, 10);
    if (isNaN(tmdb_id_num)) {
      alert("tmdb_id: kiểu số" + tmdb_id);
      return;
    }
    if (!link) {
      alert("Vui lòng nhập link");
      return;
    }
    if (!link_sub) {
      alert("Vui lòng nhập link_sub");
      return;
    }
    const linkApi = await api_add($page.url.hostname, tmdb_id_num, link, link_sub, "movie");
    tmdb_id = undefined;
    link = "http://192.168.31.215:1993/static/";
    link_sub = "http://192.168.31.215:1993/static/";
  }
</script>

<form class="w-full">
  <div class="grid gap-6 mb-6 md:grid-cols-1">
    <div>
      <label for="tmdb_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ID TMDB</label>
      <input
        type="text"
        id="tmdb_id"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="ID TMDB"
        bind:value={tmdb_id}
      />
    </div>
    <div>
      <label for="link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Link</label>
      <input
        type="text"
        id="link"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Link"
        bind:value={link}
      />
    </div>
    <div>
      <label for="link_sub" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">link_sub</label>
      <input
        type="text"
        id="link_sub"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="link_sub"
        bind:value={link_sub}
      />
    </div>
    <button
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20"
      on:click={() => {
        add_phim();
      }}
      >Thêm
    </button>
  </div>
</form>
