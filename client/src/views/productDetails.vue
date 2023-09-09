<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import NotFound from './notFound.vue';

const baseUrl = '/api';
const route = useRoute();
const router = useRouter();
const successMessage = ref(false);
const inProgress = ref(true)
const cartItems = ref([]);
const productID = route.params.id;
// const product = ref(products.find((p) => p.id === productID));
const product = ref([]);
const getData = async () => {
    const results = await axios.get(`${baseUrl}/products/${productID}`);
    product.value = results.data;
    setTimeout(() => {
        inProgress.value = false;
    }, 500);
    const cartResults = await axios.get(`${baseUrl}/users/1459/cart`);
    cartItems.value = cartResults.data;
}
getData();

async function addToCart() {
    await axios.post(`${baseUrl}/users/1459/cart`, {
        productId: productID
    });
    successMessage.value = true;
    setTimeout(() => {
        router.push('/products');
    }, 1500);
}
const itemIsInCart = computed(() => {
    return cartItems.value.some(item => item.id === productID);
})
</script>
<template>
    <div id="page-wrap" v-show="inProgress">
        <div class="skeleton-image" />
        <div id="product-details">
            <div class="skeleton-name" />
            <div class="skeleton-price" />
            <div class="skeleton-rating" />
            <div class="skeleton-button" />
            <div class="skeleton-desc" />
            <div v-for="n in 10" :key="n" class="skeleton-para" />
            <div class="skeleton-para-small" />
        </div>
    </div>
    <div id="page-wrap" v-if="product">
        <div class="img-wrap">
            <img :src="product.imageUrl" />
        </div>
        <div id="product-details">
            <h1 class="blur">{{ product.name }}</h1>
            <h3 id="price" class="blur">${{ product.price }}</h3>
            <p class="blur"> Average Rating: {{ product.averageRating }}</p>
            <button v-if="!successMessage && !itemIsInCart" id="add-to-cart" @click="addToCart">Add to Cart</button>
            <button v-if="successMessage && !itemIsInCart" class="green-button" id="add-to-cart">Successfully Added item
                to
                the cart!</button>
            <button v-if="itemIsInCart" class="grey-button" id="add-to-cart">Item is already added</button>
            <h4 class="blur">Description</h4>
            <p class="blur">{{ product.description }}</p>
        </div>
    </div>
    <NotFound v-else />
</template>
<style scoped>
#page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
    position: relative;
}

.skeleton-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
    position: absolute;
}

.img-wrap {
    text-align: center;
}

img {
    width: 400px;
    border-radius: 16px;
}

#product-details {
    padding: 16px;
    position: relative;
}

#add-to-cart {
    width: 100%;
}

#price {
    /* position: absolute; */
    top: 24px;
    right: 16px;
}

.green-button {
    background-color: green;
}

.grey-button {
    background-color: #888;
}

.skeleton-name {
    background-color: #646363;
    height: 2.8rem;
    width: 80%;
    border-radius: 8px;
    margin: 9% auto;
}

.skeleton-price {
    background-color: #646363;
    height: 2rem;
    width: 20%;
    border-radius: 8px;
    margin: 5% auto;
}

.skeleton-rating {
    background-color: #646363;
    height: 1.6rem;
    width: 60%;
    border-radius: 4px;
    margin: 6% auto;
}

.skeleton-image {
    height: 400px;
    width: 400px;
    background-color: #646363;
    border-radius: 8px;
    margin: 0 auto;
}

.skeleton-button {
    width: 100%;
    height: 50px;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    background-color: #000000;
    margin: 0 auto;
}

.skeleton-desc {
    background-color: #646363;
    height: 1rem;
    width: 30%;
    border-radius: 4px;
    margin: 6% auto;
}

.skeleton-para {
    background-color: #646363;
    height: .7rem;
    width: 100%;
    border-radius: 4px;
    margin: 7.5px auto;
}

.skeleton-para-small {
    background-color: #646363;
    height: .7rem;
    width: 50%;
    border-radius: 4px;
    margin: 7.5px auto;
}
</style>
