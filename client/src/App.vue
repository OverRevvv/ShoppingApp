<script setup>
import navbar from './components/navbar.vue';
import Footer from './components/footer.vue';
</script>

<template>
  <navbar />
  <router-view />
  <Footer />
</template>

<style>
* {
  box-sizing: border-box;
  font-family: Arial;
}

#page-wrap {
  margin: auto;
  /* max-width: 800px; */
  scroll-behavior: smooth;
  min-height: 100vh;
  overflow: hidden;
}

button {
  background-color: black;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: 0;
  padding: 16px;
}
</style>

