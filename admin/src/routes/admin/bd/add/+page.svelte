<script>
  import { api_add_bd } from "$lib/api";
  import { page } from "$app/stores";
  const static_url = "http://192.168.31.215:1993/static_bd/";
  /**
   * @type {string | undefined}
   */
  let link = static_url;
  /**
   * @type {string | undefined}
   */
  let link_sub = static_url;
  let ten = '', avatar = '';
  async function add_phim() {
    if (!link) {
      alert("Vui lòng nhập link");
      return;
    }
    // @ts-ignore
    const linkApi = await api_add_bd($page.url.hostname,ten,avatar, link, link_sub===static_url ? '':link_sub);
    if(linkApi){
      avatar = '';
    ten=''
    link = static_url;
    link_sub = static_url;
    }
    
  }
</script>

<form class="w-full">
  <div class="grid gap-6 mb-6 md:grid-cols-1">
    <div>
      <label for="ten" class="block mb-2 text-sm font-medium text-gray-300 dark:text-gray-300">ten</label>
      <input
        type="text"
        id="ten"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Ten"
        bind:value={ten}
      />
    </div>
    <div>
      <label for="avatar" class="block mb-2 text-sm font-medium text-gray-300 dark:text-gray-300">avatar</label>
      <input
        type="text"
        id="avatar"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="avatar"
        bind:value={avatar}
      />
    </div>
    <div>
      <label for="link" class="block mb-2 text-sm font-medium text-gray-300 dark:text-gray-300">Link</label>
      <input
        type="text"
        id="link"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Link"
        bind:value={link}
      />
    </div>
    <div>
      <label for="link_sub" class="block mb-2 text-sm font-medium text-gray-300 dark:text-gray-300">link_sub</label>
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
