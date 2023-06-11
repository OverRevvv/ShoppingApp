<script setup>
// import { products } from '../fake-data'
import axios from 'axios'
import { ref } from 'vue';
const products = ref([]);
import productsGrid from '../components/productsGrid.vue';
const getData = async () => {
    const results = await axios.get('http://localhost:8000/api/products');
    products.value = results.data;
}
getData();
</script>
<template>
    <div id="page-wrap">
        <productsGrid :products="products" />
    </div>
</template>
