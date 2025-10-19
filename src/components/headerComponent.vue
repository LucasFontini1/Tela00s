<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const currentPath = computed(() => route.path)
</script>
<template>
    <header>
        <nav>
            <h1>
                <RouterLink to="/"><img src="/public/logo.png" alt="LOGO"></RouterLink>
            </h1>
            <ul class="pages">
                <li>
                    <RouterLink to="/" :class="{ paginaAtual: currentPath === '/' }">INICIO</RouterLink>
                </li>
                <li>
                    <RouterLink to="/series" :class="{ paginaAtual: currentPath === '/series' }">SERIES</RouterLink>
                </li>

            </ul>
            <ul class="icons">
                <li>
                    <span class="mdi mdi-magnify"></span>
                </li>
            </ul>
        </nav>
    </header>
</template>
<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

nav h1 img {
    width: 100%;
    cursor: pointer;
}

nav ul {
    display: flex;
    gap: 2rem;
    list-style: none;
    justify-content: left;
}

nav ul li {
    cursor: pointer;
    font-weight: bold;
}

nav ul.pages {
    background-color: #1B5EB8;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: #0F3363 5px solid;
}

nav ul.pages li a {
    color: white;
    text-decoration: none;
    font-family: 'Krona One', sans-serif;
    padding: 0.3rem 1rem;
}

header nav ul.pages li a.paginaAtual {
    background-color: #0F3363;   
    border-radius: 4px;
}

ul.icons li span {
    font-size: 2rem;
    color: #1B5EB8;
}

</style>