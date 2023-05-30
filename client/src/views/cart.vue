<script setup>
import { computed } from 'vue';
import { cartItems } from '../fake-data';
import productList from '../components/productList.vue';
const totalPrice = computed(() => {
    return cartItems.reduce((sum, item) => sum + Number(item.price), 0);
});
</script>
<template>
    <productList :products="cartItems" />
    <h3 class="total-price">Total: ${{ totalPrice }}</h3>
    <button id="checkout-button">Proceed to checkout</button>
</template>