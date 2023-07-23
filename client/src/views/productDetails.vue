<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import NotFound from './notFound.vue';

const baseUrl = '/api';
const route = useRoute();
const router = useRouter();
const successMessage = ref(false);
const cartItems = ref([]);
const productID = route.params.id;
// const product = ref(products.find((p) => p.id === productID));
const product = ref([]);
const getData = async () => {
    const results = await axios.get(`${baseUrl}/products/${productID}`);
    product.value = results.data;

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
    <div id="page-wrap" v-if="product">
        <div id="img-wrap">
            <img :src="product.imageUrl" />
        </div>
        <div id="product-details">
            <h1>{{ product.name }}</h1>
            <h3 id="price">{{ product.price }}</h3>
            <p> Average Rating: {{ product.averageRating }}</p>
            <button v-if="!successMessage && !itemIsInCart" id="add-to-cart" @click="addToCart">Add to Cart</button>
            <button v-if="successMessage && !itemIsInCart" class="green-button" id="add-to-cart">Successfully Added item to
                the cart!</button>
            <button v-if="itemIsInCart" class="grey-button" id="add-to-cart">Item is already added</button>
            <h4>Description</h4>
            <p>{{ product.description }}</p>
        </div>
    </div>
    <NotFound v-else />
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
