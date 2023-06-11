<script setup>
import { ref, computed} from 'vue';
import axios from 'axios'
import productList from '../components/productList.vue';
const cartItems = ref([]);
const getData = async () => {
    const results = await axios.get("http://localhost:8000/api/users/1459/cart");
    cartItems.value = results.data;
}
getData();

const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + Number(item.price), 0);
});
async function removeFromCart(productId) {
    const result = await axios.delete(`http://localhost:8000/api/users/1459/cart/${productId}`);
    cartItems.value = result.data; 
}

</script>
<template>
    <productList @remove-from-cart="removeFromCart($event)" :products="cartItems" />
    <h3 class="total-price">Total: ${{ totalPrice }}</h3>
    <button id="checkout-button">Proceed to checkout</button>
</template>