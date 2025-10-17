<script setup>
    import { RouterLink } from 'vue-router';
</script>
<template>
    <header>
        <nav>
            <RouterLink to="/"><img src=" /logo.png" alt=""></RouterLink>
            <ul>
                <li>
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li>
                    <RouterLink to="/series">Séries</RouterLink>
                </li>
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
        padding: 1rem 2rem;
        align-items: center;
    }
    img{
        width: 7rem;
        height: auto;
    }
    ul {
        list-style: none;
        display: flex;
        gap: 2rem;
        margin-right: 2rem;
        align-items: center;
    }
    li a{
        font-size: 1.5rem;
        color: black;
        text-decoration: none;
        font-family: "Quantico", sans-serif;
    }
    span{
        cursor: pointer;
        font-size: 1.8rem;
    }
</style>