<script setup>
import productGridItem from './productGridItem.vue';
import { defineProps } from 'vue';
 defineProps({
    products: String
 })
</script>
<template>
    <div class="grid-wrap">
        <productGridItem 
        v-for="product in products" 
        :key="product.id" 
        :product="product"/>
    </div>
</template>
<style scoped>
.grid-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 16px;
}
</style>
