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
    <productList @remove-from-cart="removeFromCart($event)" :total-price="totalPrice" :products="cartItems" />
</template>