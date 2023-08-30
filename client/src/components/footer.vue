<template>
    <footer>
        <span>Developed By <a href="https://github.com/OverRevvv">OverRevvv</a> | <span class="far fa-copyright"></span>
            2023
            All rights reserved.</span>
    </footer>
</template>

<style scoped>
footer {
    color: #ddd;
    text-align: center;
    position: absolute;
    padding: 5px 10px;
    left: 0;
    right: 0;
    width: 100%;
    font-family: inherit, monospace;
    user-select: none;
    background: #00000094;
    backdrop-filter: saturate(100%) blur(80px);
}

footer span a {
    color: #ddd;
    font-weight: bolder;
    text-decoration: none;
    text-shadow: 1px 1px 0 black;
}

footer span a:hover {
    text-decoration: underline;
}

@media screen and (min-width: 340px) and (max-width: 500px) {
    footer {
        font-size: 0.9rem;
    }
}
</style>