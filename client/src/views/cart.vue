<script setup>
import { ref, computed } from 'vue';
import { user, config } from '../store/log';
import axios from 'axios'
import productList from '../components/productList.vue';

const cartItems = ref([]);
const inProgress = ref(true)

const getData = async () => {
    const results = await axios.get(`/api/users/${user.userID}/cart`, config(user.token)); 
    cartItems.value = results.data;
    setTimeout(() => {
        inProgress.value = false;
    }, 500);
}
getData();

const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + Number(item.price), 0);
});

async function removeFromCart(productId) {
    const result = await axios.delete(`/api/users/${user.userID}/cart/${productId}`, config(user.token));
    cartItems.value = result.data;
}

</script>
<template>
    <div id="page-wrap">
        <h1 class="blur">Shopping Cart</h1>
        <div class="holder">
            <div v-for="n in 3" :key="n" v-if="inProgress" class="skeleton-wrap blur">
                <div class="skeleton-image"></div>
                <div class="skeleton-details-wrap">
                    <div class="skeleton-name" />
                    <div class="skeleton-price" />
                </div>
                <div class="skeleton-button" />
            </div>
        </div>
        <productList @remove-from-cart="removeFromCart($event)" :total-price="totalPrice" :products="cartItems" />
    </div>
</template>
<style scoped>
#page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
}

.holder {
    position: absolute;
    z-index: 10;
    width: 42%;
}

.skeleton-wrap {
    align-content: 'center';
    border-bottom: 1px solid #ddd;
    display: flex;
    padding: 16px;
    width: 100%;

}

.skeleton-image {
    flex: 3;
    background-color: #646363;
    height: 100px;
    max-width: 100px;
    border-radius: 8px;
}

.skeleton-details-wrap {
    padding: 0 16px;
    flex: 3;
}

.skeleton-name {
    background-color: #64636367;
    height: 40%;
    width: 90%;
    border-radius: 8px;
    margin: 0.5rem auto;
}

.skeleton-price {
    margin: 0.5rem auto;
    background-color: #64636367;
    height: 30%;
    width: 30%;
    border-radius: 8px;
}

.skeleton-button {
    flex: 3;
    margin: auto;
    width: 100%;
    height: 50px;
    border-radius: 8px;
    background-color: #111111ce;
}
</style>