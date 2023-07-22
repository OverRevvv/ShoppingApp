<template>
    <div id="nav-bar">
        <router-link to="/products" id="products-link">
            <div class="logo"> <img src="/sneaker.png" alt=""> </div>
        </router-link>
        <router-link to="/cart" id="cart-link">
            <button>Shopping Cart</button>
        </router-link>
    </div>
</template>

<style scoped>
#nav-bar {
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
</style>

