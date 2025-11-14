<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { useTvStore } from '@/stores/tv'
import Loading from 'vue-loading-overlay'
import router from '@/router'

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
})

const tvStore = useTvStore()
const seasonsList = ref(null)
const isLoading = ref(false)

const goToSeason = (seasonNum) => {
  router.push({
    name: 'seasonDetails',
    params: {
      id: props.id,            
      seasonNumber: seasonNum  
    }
  })
}

const onWheelScroll = e => {
    const el = seasonsList.value
    if (!el) return
    el.scrollLeft += e.deltaY
}

onMounted(async () => {
    isLoading.value = true
    await tvStore.getTvDetails(props.id)
    isLoading.value = false
})
</script>

<template>
    <section id="details" :style="tvStore.tvDetails.backdrop_path
        ? {
            backgroundImage: `url(https://image.tmdb.org/t/p/original${tvStore.tvDetails.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }
        : {}">
        <div class="fundo">
            <img class="ae" v-if="tvStore.tvDetails.poster_path" :src="`https://image.tmdb.org/t/p/w500${tvStore.tvDetails.poster_path}`">
            <div class="detalhes">
                <h2>{{ tvStore.tvDetails.name }}</h2>
                <div class="genres">
                    <p class="genre">{{ tvStore.tvDetails.genres?.map(g => g.name).join(', ') }}</p>
                    <p v-if="tvStore.contentRating" class="rating-badge" :class="'rating-' + tvStore.contentRating.replace('+', '')">{{ tvStore.contentRating }}</p>
                    <p class="note">{{ Math.round(tvStore.tvDetails.vote_average * 10) }}%</p>
                </div>
                <div class="trailer">
                    <div class="icn">
                        <span style="margin-right: 0.3rem; font-size: 2rem; cursor: pointer;" class="mdi mdi-heart"></span>
                    </div>
                    <p class="tr">
                        <span class="mdi mdi-play"></span> <span>Trailer</span>
                    </p>
                </div>
                <div class="sinopse">
                    <h3>Sinopse:</h3>
                    <p>{{ tvStore.tvDetails.overview }}</p>
                </div>
                <div class="seasons">
                    <ul ref="seasonsList" @wheel.prevent="onWheelScroll">
                        <li v-for="tv in tvStore.tvDetails.seasons" :key="tv.id" @click="goToSeason(tv.season_number)">
                            <img class="imgSeason" :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`">
                            <h2>{{ tv.name }}</h2>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section id="elenco">
        <h2 class="tittle">Elenco:</h2>
        <ul>
            <li v-for="actor in tvStore.tvCast" :key="actor.id" class="actor">
                <img :src="actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : 'https://via.placeholder.com/300x450?text=Sem+Foto'">
                <p>{{ actor.name }}</p>
            </li>
        </ul>
    </section>
    <button class="voltar" @click="router.back()" style="display: block; margin-left: auto; margin-right: 4rem;">
        Voltar
    </button>

    <loading v-model:active="isLoading" is-full-page />
</template>

<style scoped>
.fundo {
    background-color: rgba(70, 115, 169, 0.8);
    display: flex;
    padding: 4rem 8rem;
    gap: 4rem;
}
.rating-badge {
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    border-radius: 6px;
    line-height: 1;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    font-size: 0.8rem;
}
.rating-L { background-color: #4caf50; }
.rating-10 { background-color: #2196f3; }
.rating-12 { background-color: #ffc107; color: #000; }
.rating-14 { background-color: #ff9800; }
.rating-16 { background-color: #f44336; }
.rating-18 { background-color: #b71c1c; }
.fundo img.ae {
    width: 20%;
    border-radius: 10px;
}
.detalhes {
    font-family: 'Actor', sans-serif;
    color: white;
    width: 80%;
}
.detalhes h2 {
    font-size: 3rem;
    font-family: 'Turret Road', sans-serif;
    font-weight: bold;
    margin-bottom: 0;
}
div.genres {
    display: flex;
    gap: 1rem;
    align-items: center;
}
.trailer {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
.trailer p {
    background-color: #4673A9;
    width: 100px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px;
}
.trailer p:hover {
    background-color: #2e4d72;
}
div.sinopse {
    margin-bottom: 1rem;
}
div.sinopse h3 {
    font-size: 1.6rem;
    margin-bottom: 0.3rem;
}
div.seasons {
    width: 70vw;
    padding: 0.5rem 0;
}
div.seasons ul {
    display: flex;
    gap: 1rem;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    padding: 1rem 3rem 0 3rem;
}
#details .seasons ul {
    mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
}
#details .seasons ul li {
    list-style: none;
    flex: 0 0 12%;
    position: relative;
    margin-bottom: 1rem;
    cursor: pointer;
}
#details .seasons ul li::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    border-radius: 6px;
    z-index: 1;
}

#details .seasons ul li:hover{
    transform: scale(1.05);
        transition: transform 0.3s ease;
}
#details .seasons ul li img {
    width: 100%;
    border-radius: 6px;
    height: 100%;
}
#details .seasons ul li h2 {
    position: absolute;
    bottom: 10%;
    left: 50%;
    font-size: 1rem;
    transform: translateX(-50%);
    white-space: nowrap;
    z-index: 2;
}
section#elenco {
    padding: 2rem 4rem;
    width: 100%;
    overflow: hidden;
}
section#elenco h2.tittle {
    color: #4673A9;
    font-family: 'Actor';
    font-size: 4rem;
}
section#elenco ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 1rem;
    width: 100%;
    overflow-x: auto;
}
section#elenco ul li {
    width: 10%;
}
section#elenco ul li img {
    width: 100%;
    height: auto;
    border-radius: 5px;
}
section#elenco ul li p {
    font-size: 1.2rem;
    font-family: 'Actor';
    text-align: center;
    color: #000;
}

/* ScrollBar */

.seasons ul::-webkit-scrollbar,
#elenco ul::-webkit-scrollbar {
    height: 10px;
}

.seasons ul::-webkit-scrollbar-track,
#elenco ul::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
}

.seasons ul::-webkit-scrollbar-thumb,
#elenco ul::-webkit-scrollbar-thumb {
    background: #4673A9;
    border-radius: 10px;
}

.seasons ul::-webkit-scrollbar-thumb:hover,
#elenco ul::-webkit-scrollbar-thumb:hover {
    background: #2e4d72;
    transition: 0.3s ease;
}
</style>
