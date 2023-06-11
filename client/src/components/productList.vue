<script setup>
import productListItem from './productListItem.vue';
defineProps({
    products: String
})
</script>
<template>
    <div id="page-wrap" v-if="products.length > 0">
        <h1>Shopping Cart</h1>
        <productListItem @remove-from-cart="$emit('remove-from-cart',$event)" v-for="product in products" :key="product.id" :product="product" />
    </div>
    <p v-else>You haven't added anything yet!</p>
</template>