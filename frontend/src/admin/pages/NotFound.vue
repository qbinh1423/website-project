<script setup>
import HeaderWeb from '../components/HeaderWeb.vue';
</script>
<template>
  <header>
    <HeaderWeb />
  </header>
  <div class="page">
    <h1>Oops, not found page!</h1>
  </div>
</template>
<style scoped>
.page {
  background-color: #fffbe9;
  min-height: 100vh;
  height: 100%;
}

h1 {
  text-align: center;
  padding-top: 5rem;
}
</style>
