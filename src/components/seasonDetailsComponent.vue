<script setup>
import { defineProps, onMounted } from 'vue'
import { useTvStore } from '@/stores/tv'

const props = defineProps({
    id: Number,
    seasonNumber: Number
})

const tvStore = useTvStore()

onMounted(() => {
    tvStore.getSeasonDetails(props.id, props.seasonNumber)
})
</script>
<template>
    <section id="season">
        <img :src="`https://image.tmdb.org/t/p/w500${tvStore.seasonDetails.poster_path}`" alt="">
        <div class="aw">
            <h2>{{ tvStore.seasonDetails.name }}</h2>
            <div class="details">
                <p class="average">
                    {{ Math.round(tvStore.seasonDetails.vote_average * 10) }}%
                </p>
                <p v-if="tvStore.seasonDetails.air_date" class="air">
                    {{ tvStore.seasonDetails.air_date.split('-')[0] }}
                </p>
                <p class="epNumber" v-if="tvStore.seasonDetails.episodes">
                    {{ tvStore.seasonDetails.episodes.length }} <span>episódios</span>
                </p>
            </div>
            <p class="overview">
                {{ tvStore.seasonDetails.overview }}
            </p>
        </div>
    </section>
</template>
<style scoped>
section#season {
    background-color: #6699D4;
    display: flex;
    gap: 4rem;
    padding: 4rem 8rem;
    width: 100%;
}
section#season img{
    width: 15%;
    border-radius: 10px;
}
section#season div.aw {
    font-family: 'Actor', sans-serif;
    color: white;
    width: 85%;
}
section#season div.aw h2{
    font-family: 'Turret Road';
    font-size: 3rem;
    font-weight: bold;
}
section#season div.aw div.details{
    display: flex;
    font-family: 'Roboto';
    font-size: 1.2rem;
    align-items: center;
    margin-bottom: 1rem;
}
section#season div.aw div.details p.average{
    background-color: #4673A9;
    border-radius: 10px;
    padding: 5px 10px;
    text-align: center;
    margin-right: 2rem;
}
section#season div.aw div.details p.air{
    padding-right: 1rem;
    border-right: white solid 2px;
}
section#season div.aw div.details p.epNumber{
    padding-left: 1rem;
}
section#season div.aw div.details p.epNumber span{
font-family: 'Actor';
}
section#season div.aw p.overview{
    font-size: 1.1rem;
}
</style>