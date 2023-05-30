<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { products } from '../fake-data'
import NotFound from './notFound.vue';

const route = useRoute();
const productID = route.params.id;
const product = ref(products.find((p) => p.id === productID));
</script>
<template>
    <div id="page-wrap" v-if="product">
        <div id="img-wrap">
            <img v-bind:src="product.imageUrl" />
        </div>
        <div id="product-details">
            <h1>{{ product.name }}</h1>
            <h3 id="price">{{ product.price }}</h3>
            <p> Average Rating: {{ product.averageRating }}</p>
            <button id="add-to-cart">Add to Cart</button>
            <h4>Description</h4>
            <p>{{ product.description }}</p>
        </div>
    </div>
    <NotFound v-else/>
</template>
<style scoped>
#page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
}

#img-wrap {
    text-align: center;
}

img {
    width: 400px;
}

#product-details {
    padding: 16px;
    position: relative;
}

#add-to-cart {
    width: 100%;
}

#price {
    position: absolute;
    top: 24px;
    right: 16px;
}

.green-button {
    background-color: green;
}

.grey-button {
    background-color: #888;
}
</style>
