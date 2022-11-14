<script>
  // @ts-nocheck

  import { page } from "$app/stores";
  import { api_delete_movie, api_get_movie } from "$lib/api";
  import { onMount } from "svelte";
  let data = [];
  let search = undefined;
  async function get_data() {
    data = [];
    const linkApi = await api_get_movie($page.url.hostname);
    data = linkApi?.data.data;
  }
  async function delete_phim(id) {
    await api_delete_movie($page.url.hostname, id);
    get_data();
  }
  onMount(async () => {
    get_data();
  });
  $: visibleData = search
    ? data.filter((v) => {
        const search_string = search.toUpperCase();
        return (
          v.phim_ten.toUpperCase().match(`${search_string}.*`) ||
          v.phim_ten_en.toUpperCase().match(`${search_string}.*`)
        );
      })
    : data;
</script>

{#if data.length === 0}
  <p>...waiting</p>
{:else if data}
  <div class="flex flex-col w-full">
    <button
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20"
      >Thêm
    </button>
    <input
      type="text"
      id="first_name"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search"
      bind:value={search}
    />

    <table class="styled-table">
      <thead>
        <tr>
          <th style="width: 5%">ID</th>
          <th style="width: 25%">Tên</th>
          <th style="width: 20%">Tên_En</th>
          <th style="width: 5%">TMDB</th>
          <th style="width: 20%">Link</th>
          <th style="width: 15%">Created at</th>
          <th style="width: 5%">Delete</th>
        </tr>
      </thead>
      <tbody>
        {#each visibleData as item}
          <tr>
            <td>{item.phim_id}</td>
            <td>{item.phim_ten}</td>
            <td>{item.phim_ten_en}</td>
            <td>{item.phim_tmdb_id}</td>
            <td>{item.phim_linkstream_linkstream}</td>
            <td>{item.phim_created_at}</td>
            <td
              ><button
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                on:click={() => {
                  delete_phim(item.phim_id);
                }}
                >Delete
              </button></td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
