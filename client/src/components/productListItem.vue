<script setup>
defineProps({
  product: Object
})
</script>
<template>
  <div class="product-container blur">
    <img :src="product.imageUrl" alt="" class="product-image">
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p>${{ product.price }}</p>
    </div>
    <button class="remove-button" @click="$emit('remove-from-cart', product.id)">Remove from cart</button>
  </div>
</template>
<style scoped>
.product-container {
  align-content: 'center';
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: 16px;
  width: 100%;
}
img{
  border-radius: 8px;
}

.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
}

.details-wrap {
  padding: 0 16px;
  flex: 3;
}

.remove-button {
  flex: 3;
  margin: auto;
}

/* 
@media (max-width: 640px) {
  .details-wrap {
    flex: 3;
  }

  .remove-button {
    flex: 1;
    margin: auto;
  }
} */
</style>
