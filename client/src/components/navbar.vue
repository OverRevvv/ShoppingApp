<template>
    <div class="nav-bar blurNav">
        <router-link to="/products" id="products-link">
            <div class="logo"> <img src="/sneaker.png" alt=""> </div>
        </router-link>
        <router-link to="/cart" id="cart-link">
            <button>Shopping Cart</button>
        </router-link>
    </div>
    <div class="dummy-nav"/>
</template>

<style scoped>
.nav-bar {
    border-bottom: 1px solid #ddd;
    height: 75px;
    width: 100%;
    position: fixed;
    margin: 0 auto;
    inset: 0 0 0 0;
    z-index: 20;
}
.dummy-nav{
    height: 75px;
    width: 100%;
    margin: 0 auto;
    inset: 0 0 0 0;
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
  background: #0000005e;
  backdrop-filter: saturate(100%) blur(80px);
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* text-shadow: 1px 1px 0 black; */
  /* border-radius: 30rem; */
}
</style>

