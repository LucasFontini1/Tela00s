<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { useTvStore } from '@/stores/tv'
import api from '@/plugins/axios'
import { useRouter } from 'vue-router'
import Loading from 'vue-loading-overlay'

const props = defineProps({
    id: Number,
    seasonNumber: Number
})

const isLoading = ref(false)
const tvStore = useTvStore()
const router = useRouter()

const openEp = ref(null)
const guestStars = ref({})

function goToEnd() {
    const el = document.getElementById("fundo")
    if (el) el.scrollIntoView({ behavior: "smooth" })
}

async function toggle(ep) {
    if (openEp.value === ep.episode_number) {
        openEp.value = null
        return
    }

    openEp.value = ep.episode_number

    if (guestStars.value[ep.episode_number]) return

    const res = await api.get(
        `tv/${props.id}/season/${props.seasonNumber}/episode/${ep.episode_number}?language=pt-BR`
    )

    guestStars.value[ep.episode_number] = res.data.guest_stars || []
}

function formatDate(dateStr) {
    if (!dateStr) return ""
    const date = new Date(dateStr)
    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    }).replace(/(^\d+ de )([a-z])/, (_, dia, mes) => dia + mes.toUpperCase())
}

const goToActor = (id) => {
    router.push({
        name: 'ator',
        params: {
            id: id
        }
    })
}

onMounted(async () => {
    isLoading.value = true
    await tvStore.getSeasonDetails(props.id, props.seasonNumber)
    isLoading.value = false
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

    <div class="irParaFundo" style="display: flex; justify-content: center; margin-top: 2rem;">
        <button class="voltar" @click="goToEnd">Ir para o final</button>
    </div>

    <section id="ep">
        <ul>
            <li class="eps" v-for="ep in tvStore.seasonDetails.episodes" @click="toggle(ep)">
                <div class="noClick">
                    <div style="display: flex; gap: 2rem;">
                        <img class="oi" :src="`https://image.tmdb.org/t/p/w500${ep.still_path}`" :alt="`${ep.name} poster`">
                        <div class="text">
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <h3>
                                    <span>{{ ep.episode_number }}</span>. {{ ep.name }}
                                </h3>
                                <p class="vot">
                                    {{ Math.round(ep.vote_average * 10) }}%
                                </p>
                            </div>
                            <p class="dat" v-if="tvStore.seasonDetails.air_date">
                                {{ formatDate(tvStore.seasonDetails.air_date) }}
                            </p>
                            <p class="over">
                                {{ ep.overview }}
                            </p>
                        </div>
                    </div>
                    <span class="mdi mdi-chevron-down span" :class="{ open: openEp === ep.episode_number }"></span>
                </div>

                <transition name="ep">
                    <div class="click" v-if="openEp === ep.episode_number">
                        <div class="crew">
                            <h4>Equipe técnica <span>{{ ep.crew.length }}</span></h4>
                            <ul>
                                <li v-for="people in ep.crew" :key="people.credit_id">
                                    <strong>{{ people.job }}:</strong> {{ people.name }}
                                </li>
                            </ul>
                        </div>

                        <div class="guests">
                            <h4>Artistas convidados <span>{{ guestStars[ep.episode_number]?.length || 0 }}</span></h4>

                            <ul class="actorList">
                                <li v-for="actor in guestStars[ep.episode_number]" :key="actor.credit_id" @click="goToActor(actor.id)">
                                    <img :src="actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : '/no-img.png'" alt="">
                                    <div>
                                        <p class="name">{{ actor.name }}</p>
                                        <p class="character">{{ actor.character }}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </transition>
            </li>
        </ul>
    </section>

    <div id="fundo">
        <button class="voltar" @click="router.back()" style="display: block; margin-left: auto; margin-right: 4rem;">
            Voltar
        </button>
        <Loading v-model:active="isLoading" is-full-page />
    </div>
</template>

<style scoped>
section#season {
    background-color: #6699D4;
    display: flex;
    gap: 4rem;
    padding: 4rem 8rem;
    width: 100%;
}

section#season img {
    width: 15%;
    border-radius: 10px;
}

section#season div.aw {
    font-family: 'Actor', sans-serif;
    color: white;
    width: 85%;
}

section#season div.aw h2 {
    font-family: 'Turret Road';
    font-size: 3rem;
    font-weight: bold;
}

section#season div.aw div.details {
    display: flex;
    font-family: 'Roboto';
    font-size: 1.2rem;
    align-items: center;
    margin-bottom: 1rem;
}

section#season div.aw div.details p.average {
    background-color: #4673A9;
    border-radius: 10px;
    padding: 5px 10px;
    text-align: center;
    margin-right: 2rem;
}

section#season div.aw div.details p.air {
    padding-right: 1rem;
    border-right: white solid 2px;
}

section#season div.aw div.details p.epNumber {
    padding-left: 1rem;
}

section#season div.aw div.details p.epNumber span {
    font-family: 'Actor';
}

section#season div.aw p.overview {
    font-size: 1.1rem;
}
</style>

<style scoped>
section#ep {
    padding: 2rem 4rem;
}

section#ep ul {
    padding: 0;
    list-style: none;
}

section#ep ul li.eps {
    margin-bottom: 2rem;
    padding: 2rem;
    border-radius: 5px;
    box-shadow: 0 0 10px 2px #97A6BC;
}

section#ep ul li div.noClick {
    position: relative;
}

section#ep ul li div.noClick img {
    border-radius: 10px;
}

section#ep ul li div.noClick div.text h3 {
    font-size: 2rem;
    font-weight: normal;
}

section#ep ul li div.noClick div.text p.vot {
    background-color: #4673A9;
    color: #fff;
    padding: 6px;
    border-radius: 25%;
}

section#ep ul li div.noClick div.text p.dat {
    color: #727272;
    font-size: 0.8rem;
    margin-bottom: 1.5rem;
}

section#ep ul li span.span {
    color: #4673A9;
    font-size: 2.5rem;
    position: absolute;
    bottom: 0;
    right: 0;
    transition: .3s;
}

section#ep ul li span.span.open {
    transform: rotate(180deg);
}

section#ep ul li div.click {
    padding-top: 2rem;
    display: grid;
    grid-template-columns: 1fr 2fr 0.5fr;
    gap: 2rem;
    width: 100%;
}

section#ep ul li div.click .crew h4,
section#ep ul li div.click .guests h4 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

section#ep ul li div.click .crew span,
section#ep ul li div.click .guests span {
    color: #555;
    font-weight: 400;
}

section#ep ul li div.click .crew ul {
    list-style: none;
    padding: 0;
}

section#ep ul li div.click .crew ul li {
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
}

section#ep ul li div.click div.guests ul.actorList {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem 2rem;
}

section#ep ul li div.click div.guests ul.actorList li {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
}

section#ep ul li div.click div.guests ul.actorList li:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
    cursor: pointer;
}

section#ep ul li div.click div.guests ul.actorList li img {
    width: 7vh;
    height: 7vh;
    border-radius: 8px;
    object-fit: cover;
}

section#ep ul li div.click div.guests ul.actorList p.name {
    font-weight: 600;
}

section#ep ul li div.click div.guests ul.actorList p.character {
    color: #666;
    font-size: 0.9rem;
}

.oi {
    width: 20%;
}

.ep-enter-from,
.ep-leave-to {
    opacity: 0;
    max-height: 0;
}

.ep-enter-to,
.ep-leave-from {
    opacity: 1;
    max-height: 500px;
}

.ep-enter-active,
.ep-leave-active {
    transition: all .3s ease;
    overflow: hidden;
}
</style>
