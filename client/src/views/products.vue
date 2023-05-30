<script setup>
import { products } from '../fake-data'
import productsGrid from '../components/productsGrid.vue';
</script>
<template>
    <div id="page-wrap">
        <productsGrid :products="products"/>
    </div>
</template>
