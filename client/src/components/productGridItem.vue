<script setup>
defineProps({
    product: Object
})
</script>
<template>
    <div class="product-item blur">
        <img loading="lazy" :src="product.imageUrl" />
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">${{ product.price }}</p>
        <router-link v-bind:to="'/products/' + product.id">
            <button>View Details</button>
        </router-link>
    </div>
</template>

<style scoped>
.product-item {
    align-items: center;
    border-radius: 8px;
    box-shadow: 0px 2px 5px #888;
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
    padding: 20px;
    position: relative;
    width: 32%;
    /* background-color: black; */
}

.product-name {
    margin-bottom: 0;
}

img {
    height: 200px;
    width: 200px;
    border-radius: 8px;
}

a {
    width: 100%;
}

button {
    width: 100%;
}
</style>

