<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { useTvStore } from '@/stores/tv';
import Loading from 'vue-loading-overlay';
import { useRouter } from 'vue-router';

const tvStore = useTvStore();
const isLoading = ref(false);
const currentBackdrop = ref();
const seriesRef = ref(null);
const router = useRouter();

const handleWheel = (e) => {
    if (seriesRef.value) {
        e.preventDefault();
        seriesRef.value.scrollLeft += e.deltaY;
    }
};

onMounted(async () => {
    isLoading.value = true;
    await tvStore.fetchTv2000s();
    isLoading.value = false;

    if (seriesRef.value) {
        seriesRef.value.addEventListener('wheel', handleWheel, { passive: false });
    }
    currentBackdrop.value = `https://image.tmdb.org/t/p/original${tvStore.tv[0].backdrop_path}`;
});

const setBackdrop = (backdropPath) => {
    currentBackdrop.value = `https://image.tmdb.org/t/p/original${backdropPath}`;
};

function openTv(id){
    router.push({name: 'tvDetails', params: { id } })
}


onBeforeUnmount(() => {
    if (seriesRef.value) {
        seriesRef.value.removeEventListener('wheel', handleWheel);
    }
});
</script>

<template>
    <section class="melhoresSeries"
        :style="{ backgroundImage: currentBackdrop ? `url(${currentBackdrop})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', transition: 'background-image 0.5s ease-in-out' }">
        <div class="fundo">
            <h2>Séries mais procuradas</h2>
            <ul class="series" ref="seriesRef">
                <li v-for="tv in tvStore.tv" :key="tv.id" @mouseover="setBackdrop(tv.backdrop_path)" @click="openTv(tv.id)">
                    <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.name" />
                    <h3>{{ tv.name }}</h3>
                    <div class="data-nota">
                        <p>{{ tv.first_air_date.split('-')[0] }}</p>
                        <p>{{ Math.round(tv.vote_average * 10) }}%</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>

    <loading v-model:active="isLoading" is-full-page />
</template>

<style scoped>

.series{
    mask-image: linear-gradient(to right, 
        transparent 0%,
        black 5%, 
        black 95%, 
        transparent 100% 
    );
    
    
    -webkit-mask-image: linear-gradient(to right, 
        transparent 0%, 
        black 5%, 
        black 95%, 
        transparent 100%
    );
}


.melhoresSeries .fundo {
    background-color: #0F336380;
    width: 100%;
    padding: 4rem 2rem;
    margin-top: 6rem;
}

.melhoresSeries h2 {
    margin-bottom: 1.5rem;
    font-family: 'Krona One', sans-serif;
    color: white;
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
    background-color: black;
    border-radius: 8px;
    box-shadow: 2px 5px 8px #ffffff50;
    padding: 1rem;
    text-align: center;
}

.series li:hover {
    transform: scale(1.05);
    transition: transform 0.3s;
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
    color: white;
}

.series li h3 {
    font-size: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    margin-bottom: 0.5rem;
    font-family: 'Krona One', sans-serif;
    font-weight: normal;
    color: white;
}

/* Customização da barra de rolagem */
.series::-webkit-scrollbar {
    height: 0.7rem;
    background-color: #f1f1f1;
}

.series::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 14px;
}

.series::-webkit-scrollbar-thumb {
    background: #0F3363;
    border-radius: 4px;
}

.series::-webkit-scrollbar-thumb:hover {
    background: #1B5EB8;
}
</style>
