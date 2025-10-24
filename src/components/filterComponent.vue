<script setup>
    import { ref } from 'vue';


    const isOpen = ref(false);
    function toggleFilter() {
        isOpen.value = !isOpen.value;
    }
</script>
<template>
    <section class="filter">
        <div class="alwais-open">
            <span @click="toggleFilter()" class="mdi mdi-menu menu" v-if="!isOpen"></span>
            <span @click="toggleFilter()" class="mdi mdi-menu-close menu" v-if="isOpen"></span>
            <h2>Filtrar</h2>
        </div>
    </section>
</template>
<style scoped>
    .filter {
        padding: 20px;
        background-color: #1B5EB8;
        width: 30%;
        margin: 0 auto;
        text-align: center;
        color: white
    }
    .alwais-open {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        justify-content: center;
    }
    .menu {
        font-size: 2rem;
    }
</style>