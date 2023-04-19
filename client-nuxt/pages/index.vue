<script setup>
const route = useRoute();
const url = `http://192.168.31.215:1994/phim/home/movie`;
const { data: data } = await useFetch(url);
</script>
<template>
  <h1>Home page</h1>
</template>
