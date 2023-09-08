<script setup>
// import { products } from '../fake-data'
import axios from 'axios'
import { ref } from 'vue';
const products = ref([]);
import productsGrid from '../components/productsGrid.vue';


const inProgress = ref(true)
const baseUrl = '/api'
const getData = async () => {
    const results = await axios.get(`${baseUrl}/products`);
    products.value = results.data;
    setTimeout(() => {
        inProgress.value = false;
    }, 500);
}
getData();
</script>
<template>
    <div id="page-wrap" class="rel">
        <div v-show="inProgress">
        <!-- <div> -->
            <div class="skeleton-wrap">
                <div v-for="n  in 6" :key="n" class="skeleton-item blur loading">
                    <div class="skeleton-image" />
                    <h3 class="skeleton-name" />
                    <p class="skeleton-price" />
                    <div class="skeleton-button" />
                </div>
            </div>
        </div>
        <productsGrid class="rel" :products="products" />
    </div>
</template>
<style scoped>
.skeleton-wrap {
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0px 2px 5px #888;
    justify-content: space-between;
    position: absolute;
    z-index: 10;
}

.rel {
    position: relative;
}

.skeleton-item {
    align-items: center;
    height: 393px;
    width: 256px;
    border-radius: 8px;
    box-shadow: 0px 2px 5px #888;
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
    padding: 20px;
    position: relative;
    width: 32%;
    transition: opacity ease-in-out;
}

.skeleton-image {
    background-color: #646363;
    height: 200px;
    width: 200px;
    border-radius: 8px;
}

.skeleton-name {
    background-color: #646363;
    height: 10%;
    width: 60%;
    margin-bottom: 0;
    border-radius: 8px;
}

.skeleton-price {
    background-color: #646363;
    height: 10%;
    width: 30%;
    border-radius: 8px;
}

.skeleton-button {
    /* width: 216px; */
    width: 100%;
    height: 50px;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    background-color: #111111a4;
}</style>