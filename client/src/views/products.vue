<script setup>
// import { products } from '../fake-data'
import axios from 'axios'
import { ref } from 'vue';
const products = ref([]);
import productsGrid from '../components/productsGrid.vue';


const inProgress = ref(true)
const getData = async () => {
    const results = await axios.get(`/api/products`);
    products.value = results.data;
    setTimeout(() => {
        inProgress.value = false;
    }, 300);
}
getData();
</script>
<template>
    <div id="page-wrap" class="rel">
        <div class="skeleton-wrap" v-show="inProgress">
            <div v-for="n  in 6" :key="n" class="skeleton-item blur-prod">
                <div class="skeleton-image" />
                <h3 class="skeleton-name" />
                <p class="skeleton-price" />
                <div class="skeleton-button" />
            </div>
        </div>
        <Suspense>
            <productsGrid :products="products" />
        </Suspense>
    </div>
</template>
<style scoped>
.skeleton-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
    z-index: 10;
    position: absolute;
    transition: opacity .5s ease-in-out;
    overflow-x: hidden;
}

.rel {
    position: relative;
    overflow-x: hidden;
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
}

.skeleton-image {
    background-color: #646363d8;
    height: 200px;
    width: 200px;
    border-radius: 8px;
}

.skeleton-name {
    background-color: #64636367;
    height: 10%;
    width: 60%;
    margin-bottom: 0;
    border-radius: 8px;
}

.skeleton-price {
    background-color: #64636367;
    height: 10%;
    width: 30%;
    border-radius: 8px;
}

.skeleton-button {
    width: 100%;
    height: 50px;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    background-color: #111111a4;
}
</style>