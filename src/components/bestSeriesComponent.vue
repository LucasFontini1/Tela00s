<script setup>
    import { onMounted } from 'vue';
    import { useTvStore } from '@/stores/tv';

    const tvStore = useTvStore();

    onMounted(async () => {
        await tvStore.fetchTv2000s();
    });
</script>
<template>
    <section class="melhoresSeries">
        <h2>Séries mais bem avaliadas</h2>
        <ul class="series">
            <li v-for="tv in tvStore.tv" :key="tv.id">
                <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.name" />
                <h3>{{ tv.name }}</h3>
                <div class="data-nota">
                    <p>{{ tv.first_air_date.split('-')[0] }}</p>
                    <p>{{ Math.round(tv.vote_average * 10) }}%</p>
                </div>
            </li>
        </ul>
    </section>
</template>
<style scoped>
.melhoresSeries {
    padding: 2rem;
    background-color: #f5f5f5;
}
.melhoresSeries h2 {
    margin-bottom: 1.5rem;
    font-family: 'Krona One', sans-serif;
}
.series {
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    list-style: none;
    padding-bottom: 1rem;
    align-items: center;
}
.series li {
    min-width: 200px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    text-align: center;
}
.series li img {
    width: 100%;
    border-radius: 4px;
    margin-bottom: 0.5rem;
}
.data-nota {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
}
.series li h3 {
    font-size: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    margin-bottom: 0.5rem;
}

.series::-webkit-scrollbar {
    height: 0.5rem;
    background-color: #1B5EB8; 
}

.series::-webkit-scrollbar-track {
    background: #1B5EB8;
    border-radius: 14px;
}

.series::-webkit-scrollbar-thumb {
    background: #0F3363;
    border-radius: 4px;
    padding: 1rem;
}

</style>