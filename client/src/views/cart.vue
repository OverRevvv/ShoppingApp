<script setup>
import { ref, computed } from 'vue';
import axios from 'axios'
import productList from '../components/productList.vue';

const baseUrl = '/api';
const cartItems = ref([]);
const getData = async () => {
    const results = await axios.get(`${baseUrl}/users/1459/cart`);
    cartItems.value = results.data;
}
getData();

const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + Number(item.price), 0);
});

async function removeFromCart(productId) {
    const result = await axios.delete(`${baseUrl}/users/1459/cart/${productId}`);
    cartItems.value = result.data;
}

</script>
<template>
    <div id="page-wrap">
    <h1 class="blur">Shopping Cart</h1>
    <productList @remove-from-cart="removeFromCart($event)" :total-price="totalPrice" :products="cartItems" />
    </div>
</template>
<style scoped>
#page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
}
</style>