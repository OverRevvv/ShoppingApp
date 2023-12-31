<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { user, config } from '../store/log';
import axios from 'axios'
import NotFound from './notFound.vue';

const route = useRoute();
const router = useRouter();
const successMessage = ref(false);
const inProgress = ref(true)
const cartItems = ref([]);
const productID = route.params.id;

const product = ref([]);
const getData = async () => {
    const results = await axios.get(`/api/products/${productID}`);
    product.value = results.data;
    setTimeout(() => {
        inProgress.value = false;
    }, 500);
    if (user.isLogged) {
        const cartResults = await axios.get(`/api/users/${user.userID}/cart`, config(user.token));
        cartItems.value = cartResults.data;
    }
}
getData();

async function addToCart() {
    if (user.isLogged === false) {
        toast.warn("Please Log in First", {
            theme: 'dark',
        })
        setTimeout(() => {
            router.push('/auth');
        }, 1300);
    }
    else {
        await axios.post(`/api/users/${user.userID}/cart`, {
            productId: productID
        }, config(user.token));
        successMessage.value = true;
        toast.success("Item has been added", {
            theme: 'dark',
        })
        setTimeout(() => {
            router.push('/products');
        }, 1500);
    }
}
const itemIsInCart = computed(() => {
    return cartItems.value.some(item => item.id === productID);
})
</script>
<template>
    <div id="page-wrap">
        <div class="skeleton-wrap" v-show="inProgress">
        <!-- <div class="skeleton-wrap" > -->
            <div class="skeleton-image blur" />
            <div id="product-details">
                <div class="skeleton-name blur" />
                <div class="skeleton-price blur" />
                <div class="skeleton-rating blur" />
                <div class="skeleton-button blur " />
                <div class="skeleton-desc blur" />
                <div v-for="n in 11" :key="n" class="skeleton-para blur" />
            </div>
        </div>
        <div class="prod-wrap" v-if="!inProgress">
            <div class="img-wrap">
                <img :src="product.imageUrl" />
            </div>
            <div id="product-details">
                <h1 class="blur">{{ product.name }}</h1>
                <h3 id="price" class="blur">${{ product.price }}</h3>
                <p class="blur"> Average Rating: {{ product.averageRating }}</p>
                <button v-if="!successMessage && !itemIsInCart" id="add-to-cart" @click="addToCart">Add to Cart</button>
                <button v-if="successMessage && !itemIsInCart" class="green-button" id="add-to-cart">Successfully Added item
                    to the cart!</button>
                <button v-if="itemIsInCart" class="grey-button" id="add-to-cart">Item is already added</button>
                <h4 class="blur">Description</h4>
                <p class="blur">{{ product.description }}</p>
            </div>
        </div>
        <NotFound v-show="!product" />
    </div>
</template>
<style scoped>
#page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
    position: relative;
    height: 160vh;
}

.skeleton-wrap {
    max-width: 600px;
    width: 94.8%;
    height: 100%;
    z-index: 10;
    position: absolute;
}

.prod-wrap {
    position: relative;
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
}

#add-to-cart {
    width: 100%;
}

#price {
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
    background-color: #64636367;
    height: 3.4rem;
    width: 100%;
    border-radius: 8px;
    margin: 0 auto;
    margin-top: 8%;
}

.skeleton-price {
    background-color: #64636367;
    height: 1.8rem;
    width: 100%;
    border-radius: 8px;
    margin: 0% auto;
    margin-top: 6%;
}

.skeleton-rating {
    background-color: #64636367;
    height: 1.6rem;
    width: 100%;
    border-radius: 4px;
    margin: 0% auto;
    margin-top: 4%;
}

.skeleton-image {
    height: 400px;
    width: 400px;
    background-color: #646363d8;
    border-radius: 1rem;
    margin: 0 auto;
}

.skeleton-button {
    width: 100%;
    height: 50px;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    background-color: #111111a4;
    margin: 0 auto;
    margin-top: 2.6%;
}

.skeleton-desc {
    background-color: #64636367;
    height: 1.4rem;
    width: 100%;
    border-radius: 4px;
    margin: 4.1% auto;
}

.skeleton-para {
    background-color: #6463639d;
    height: 1rem;
    width: 100%;
    border-radius: 4px;
    margin: 0 auto;
    margin-top: .2rem;
}
</style>