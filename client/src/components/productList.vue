<script setup>
import productListItem from './productListItem.vue';
defineProps({
    products: String,
    totalPrice: Number
})
</script>
<template>
    <div id="page-wrap" v-if="products.length > 0">
        <h1>Shopping Cart</h1>
        <productListItem @remove-from-cart="$emit('remove-from-cart', $event)" v-for="product in products" :key="product.id"
            :product="product" />
        <h3 class="total-price">Total: ${{ totalPrice }}</h3>
        <button id="checkout-button">Proceed to checkout</button>
    </div>
    <p v-else>You haven't added anything yet!</p>
</template>