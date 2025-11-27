<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useTvStore } from '@/stores/tv'

const route = useRoute()
const tvStore = useTvStore()

const currentPath = computed(() => route.path)

const menu = ref(false)
const searchOpen = ref(false)
const searchText = ref('')
const results = ref([])
const loading = ref(false)

function toggleMenu() {
    menu.value = !menu.value
}

function toggleSearch() {
    searchOpen.value = !searchOpen.value
    searchText.value = ''
    results.value = []
}

watch(searchText, async (value) => {
    if (!value.trim()) {
        results.value = []
        return
    }
    loading.value = true
    const res = await tvStore.search2000s(value)
    results.value = res.slice(0, 10)
    loading.value = false
})
</script>

<template>
    <header id="header">
        <nav v-if="!searchOpen">
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
                <li @click="toggleSearch">
                    <span class="mdi mdi-magnify"></span>
                </li>
                <li>
                    <span class="mdi mdi-menu" @click="toggleMenu()"></span>
                </li>
            </ul>
        </nav>

        <nav v-else class="searchBar">
            <h1>
                <RouterLink to="/"><img src="/public/logo-sem-fundo.png" alt="LOGO"></RouterLink>
            </h1>

            <div class="searchBox">
                <span class="mdi mdi-magnify"></span>
                <input type="text" v-model="searchText" placeholder="Pesquisar...">
            </div>

            <ul class="icons">
                <li @click="toggleSearch">
                    <span class="mdi mdi-close"></span>
                </li>
                <li>
                    <span class="mdi mdi-menu" @click="toggleMenu()"></span>
                </li>
            </ul>
        </nav>

        <div v-if="searchOpen && results.length" class="searchResults">
            <ul>
                <li v-for="item in results" :key="item.id">
                    <RouterLink :to="`/series/${item.id}`">
                        {{ item.name }}
                    </RouterLink>
                </li>
            </ul>
        </div>
    </header>

    <div class="menuOpened" :class="{ aparecer: menu}">
        <ul>
            <li>
                <span class="mdi mdi-heart"></span><span class="none">Curtidos</span>
            </li>
            <li>
                <span class="mdi mdi-cog"></span><span class="none">Configurações</span>
            </li>
            <li @click="toggleMenu()">
                <span class="mdi mdi-close-circle-outline"></span><span class="none">Fechar</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
header{
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 9999;
    height: 15rem;
}
nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
}
nav h1 {
    width: 15%;
    cursor: pointer;
}
nav h1 img {
    width: 100%;
}
nav ul {
    display: flex;
    gap: 2rem;
    list-style: none;
}
nav ul.pages {
    background-color: #6699D4;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: #4673A9 3px solid;
}
nav ul.pages li a {
    color: white;
    text-decoration: none;
    padding: 0.3rem 1rem;
}
.paginaAtual {
    background-color: #4673A9;
    border-radius: 4px;
}
ul.icons li span {
    font-size: 2rem;
    color: #6699D4;
}

.searchBar {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 2rem;
}
.searchBox {
    flex: 1;
    background: #6699D4;
    padding: 0.4rem 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 1rem;
}
.searchBox span {
    color: white;
    font-size: 1.4rem;
}
.searchBox input {
    width: 100%;
    background: transparent;
    outline: none;
    border: none;
    color: white;
}
.searchResults {
    position: absolute;
    top: 10rem;
    width: 90%;
    background: white;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
}
.searchResults ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.searchResults ul li {
    padding: 0.7rem;
}
.searchResults ul li a {
    text-decoration: none;
    color: #4673A9;
    font-weight: bold;
}

.menuOpened {
    position: absolute;
    right: 0;
    top: 15rem;
    background-color: #6699D4;
    color: white;
    border-radius: 8px;
    padding: 1rem;
    transform: translateX(100%);
    transition: 0.3s;
}
.menuOpened ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.aparecer {
    right: 2rem;
    transform: translateX(0);
    font-size: 1.5rem;
}
.none{
    font-size: 0;
}
.aparecer ul{
    list-style: none;
    padding: 0;
    margin: 0;
}
.aparecer:hover .none{
    font-size: 1.2rem;
    margin-left: 1rem;
    transition: 0.3s ease;
}
.aparecer ul li{
    display: flex;
    align-items: center;
    padding: 0.5rem ;
    cursor: pointer;
}
.aparecer ul li:hover{
    background-color: #4673A9;
}
</style>
