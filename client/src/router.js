import { createRouter, createWebHistory } from 'vue-router';
import productPage from './views/products.vue';
import productDetail from './views/productDetails.vue';
import cartPage from './views/cart.vue';
import notFound from './views/notFound.vue';
import auth from './views/auth.vue';

const routes = [
  { path: '/', redirect: '/products' },
  { path: '/products', name: "products", component: productPage},
  { path: '/products/:id', name: "productDetails", component: productDetail },
  { path: '/cart', name: "cart", component: cartPage },
  { path: '/auth', name: "cart", component: auth },
  { path: '/:pathMatch(.*)', name: "notFound", component: notFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;