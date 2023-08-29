<script setup>
defineProps({
  product: Object
})
</script>
<template>
  <div class="product-container">
    <img :src="product.imageUrl" alt="" class="product-image">
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p>${{ product.price }}</p>
      <button class="remove-button" @click="$emit('remove-from-cart', product.id)">Remove from cart</button>
    </div>
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

.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
}

.details-wrap {
  padding: 0 16px;
  display: flex;
  column-gap: 20%;
  justify-content: center;
  align-items: center;
  flex: 3;
}

.remove-button {
  flex: 1;
  margin: auto;
}

@media (min-width: 640px) {
  .details-wrap {
    column-gap: 0%;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  .remove-button {
    /* flex: 1; */
    margin: auto;
  }
}
</style>
