import { createRouter, createWebHistory } from 'vue-router';
import productPage from './views/products.vue'
// import productDetail from './views/productDetails.vue'
// import cartPage from './views/cart.vue'
// import notFound from './views/notFound.vue'

const routes = [
  { path: '/', redirect: '/products' },
  { path: '/products', name: "products", component: productPage, },
  { path: '/products/:id', name: "productDetails", component: ()=> import('./views/productDetails.vue') },
  { path: '/cart', name: "cart", component:()=> import('./views/cart.vue') },
  { path: '/:pathMatch(.*)', name: "notFound", component:()=> import('./views/notFound.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;