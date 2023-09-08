<template>
    <div class="nav-bar blurNav">
        <router-link to="/products" id="products-link">
            <div class="logo"> <img src="/sneaker.png" alt=""> </div>
        </router-link>
        <router-link to="/cart" id="cart-link">
            <button>Shopping Cart</button>
        </router-link>
    </div>
</template>

<style scoped>
.nav-bar {
    border-bottom: 1px solid #ddd;
    height: 75px;
    width: 100%;
}
.logo img{
    width: 5rem;
    transform: translate(2rem, -1rem);
}
#products-link {
    text-align: center;
    display: block;
    color: white;
    font-size: 22px;
    left: 32px;
    position: absolute;
    top: 16px;
    text-decoration: none;
}

#products-link h1 {
    margin: 0;
}

#cart-link {
    position: absolute;
    right: 16px;
    top: 16px;
}
.blurNav {
  /* background: transparent; */
  background: #00000027;
  backdrop-filter: saturate(100%) blur(40px);
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 1px 1px 0 black;
  /* border-radius: 30rem; */
}
</style>

