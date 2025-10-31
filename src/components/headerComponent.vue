<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed, ref } from 'vue'

const route = useRoute()

const currentPath = computed(() => route.path)

const menu = ref(false)

function toggleMenu() {
    menu.value = !menu.value
}
</script>
<template>
    <header id="header">
        <nav>
            <h1>
                <RouterLink to="/"><img src="/public/logo-sem-fundo.png" alt="LOGO"></RouterLink>
            </h1>
            <ul class="pages">
                <li>
                    <RouterLink to="/" :class="{ paginaAtual: currentPath === '/' }">INICIO</RouterLink>
                </li>
                <li>
                    <RouterLink to="/series" :class="{ paginaAtual: currentPath === '/series' }">SÉRIES</RouterLink>
                </li>

            </ul>
            <ul class="icons">
                <li>
                    <span class="mdi mdi-magnify"></span>
                </li>
                <li>
                    <span class="mdi mdi-menu" @click="toggleMenu()"></span>
                </li>
            </ul>
        </nav>
    </header>
    <div class="menuOpened" :class="{ aparecer: menu}">
        <ul>
            <li>
                <span class="mdi mdi-heart"></span><span class="none">Curtidos</span>
            </li>
            <li>
                <span class="mdi mdi-star"></span><span class="none">Favoritos</span>
            </li>
            <li>
                <span class="mdi mdi-cog"></span><span class="none">Configurações</span>
            </li>
            <li  @click="toggleMenu()">
                <span class="mdi mdi-close-circle-outline"></span><span class="none">Fechar</span>
            </li>
            
        </ul>
    </div>
</template>
<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

nav h1 {
    width: 10%;
    cursor: pointer;
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
.menuOpened {
    position: absolute;
    right: 0rem;
    top: 10rem;
    background-color: #1B5EB8;
    color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    padding: 1rem;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
}
.aparecer {
    right: 2rem;
    transform: translateX(0);
    transition: transform 0.3s ease-in-out;
}
.menuOpened:hover ul li span.none {
        font-size: 1.3rem;
    transition: 0.1s ease-in;
}
.menuOpened:hover ul li{
    gap: 1rem;
}
.menuOpened ul li span.none{
    font-size: 0px;
}
.menuOpened ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.menuOpened ul li {
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.menuOpened ul li span {
    font-size: 1.5rem;
}
.menuOpened ul li:hover {
    background-color: #0F3363;
    border-radius: 4px;
    transition: 0.3s ease-in;
}
</style>