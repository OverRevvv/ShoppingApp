<script setup>
// import { products } from '../fake-data'
import axios from 'axios'
import { ref } from 'vue';
const products = ref([]);
import productsGrid from '../components/productsGrid.vue';

// const prodURL = `https://shoekart-31xv.onrender.com`;
// const baseUrl = process.env.NODE_ENV === 'production' ? prodURL : '/api'
const baseUrl = '/api'
const getData = async () => {
    const results = await axios.get(`${baseUrl}/products`);
    products.value = results.data;
}
getData();
</script>
<template>
    <div id="page-wrap">
        <productsGrid :products="products" />
    </div>
</template>
