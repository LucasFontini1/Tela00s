<script setup>
import { defineProps, onMounted } from 'vue'
import { useTvStore } from '@/stores/tv'

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
})

const tvStore = useTvStore()

onMounted(() => {
    tvStore.getTvDetails(props.id)
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
            <img class="ae" v-if="tvStore.tvDetails.poster_path"
                :src="`https://image.tmdb.org/t/p/w500${tvStore.tvDetails.poster_path}`" :alt="tvStore.tvDetails.name">
            <div class="detalhes">
                <h2>{{ tvStore.tvDetails.name }}</h2>
                <div class="genres">
                    <p class="genre">
                        {{tvStore.tvDetails.genres?.map(g => g.name).join(', ')}}
                    </p>

                    <p v-if="tvStore.contentRating" class="rating-badge"
                        :class="'rating-' + tvStore.contentRating.replace('+', '')">
                        {{ tvStore.contentRating }}
                    </p>
                    <p class="note">{{ Math.round(tvStore.tvDetails.vote_average * 10) }}%</p>
                </div>
                <div class="trailer">
                    <div class="icn">
                        <span style="margin-right: 0.3rem;" class="mdi mdi-heart"></span>
                    </div>
                    <p class="tr">
                        <span class="mdi mdi-play"></span> <span>Trailer</span>
                    </p>
                </div>
                <div class="sinopse">
                    <h3>
                        Sinopse:
                    </h3>
                    <p>
                        {{ tvStore.tvDetails.overview }}
                    </p>
                </div>
                <div class="seasons">
                    <ul>
                        <li v-for="tv in tvStore.tvDetails.seasons">
                            <img class="imgSeason" :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.name">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
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
    font-size: 1rem;
    border-radius: 6px;
    line-height: 1;
    text-transform: uppercase;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-size: 0.8rem;
}


.rating-L {
    background-color: #4caf50;
}

.rating-10 {
    background-color: #2196f3;
}

.rating-12 {
    background-color: #ffc107;
    color: #000;
}

.rating-14 {
    background-color: #ff9800;
}

.rating-16 {
    background-color: #f44336;
}

.rating-18 {
    background-color: #b71c1c;
}

.fundo img.ae {
    width:20%;
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

.genres .note {
    font-family: 'Roboto', sans-serif;
}

.genres p {
    margin-top: 0;
}

.trailer {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
.trailer p{
    background-color: #4673A9;
    width: 5%;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px;
}
.trailer p:hover{
    background-color: #2e4d72;
}
.trailer p .mdi{
    margin: 0;
    padding: 0;
}
.trailer span{
    cursor: pointer;
}
div.sinopse{
    margin-bottom: 1rem;
}
div.sinopse h3{
    font-size: 1.6rem;
    margin-bottom: 0.3rem;
}

div.seasons {
    width: 70vw;
    padding: 0.5rem 0; 
}

div.seasons ul {
    display: flex;
    overflow: auto;
    gap: 2rem;
    
    & li {
        list-style: none;

        & img {
            width: 100px;
        }
    }
}



</style>
