<script setup>
import { defineProps, onMounted, watch, ref } from 'vue';
import { useTvStore } from '@/stores/tv';
import router from '@/router';
import Loading from 'vue-loading-overlay'

const props = defineProps({
    id: Number
})

const isLoading = ref(false)
const tvStore = useTvStore()

const getGenderLabel = (g) => {
  switch (g) {
    case 1: return 'Feminino'
    case 2: return 'Masculino'
    default: return 'Não informado'
  }
}

const goToShow = (showId) => {
    router.push({
        name: 'tvDetails',
        params: { id: showId }
    })
}

const goToActor = (actorId) => {
    router.push({
        name: 'ator',
        params: { id: actorId }
    })
}

onMounted(async () => {
    isLoading.value = true
    await tvStore.getActorDetails(props.id)
    await tvStore.getActorCredits(props.id)
    await tvStore.getRelatedActors(props.id)
    isLoading.value = false
})

watch(() => props.id, async (newId) => {
    isLoading.value = true
    await tvStore.getActorDetails(newId)
    await tvStore.getActorCredits(newId)
    await tvStore.getRelatedActors(newId)
    isLoading.value = false
})
</script>


<template>
   <section id="actor">
    <div class="img">
        <img :src="tvStore.actor.profile_path
                ? `https://image.tmdb.org/t/p/w300${tvStore.actor.profile_path}`
             : '/img/default.jpg'">
        <ul></ul>
    </div>
    <div class="actorInfo">
        <h2>{{ tvStore.actor.name }}</h2>
        <p class="bio" v-if="tvStore.actor.biography">{{ tvStore.actor.biography }}</p>
        <p class="bio" v-else>Biografia não disponível.</p>
        <div class="separator"></div>
        <p>Conhecido por: {{ tvStore.actor.known_for_department }}</p>
    </div>
   </section>

   <section id="actorDetail">
    <div class="left">
        <div class="personalInfo">
            <h3>Informações Pessoais</h3>
            <ul>
                <li>
                    <h4>Gênero:</h4> 
                    <p>{{ getGenderLabel(tvStore.actor.gender) }}</p>
                </li>
                <li>
                    <h4>Aniversário:</h4>
                    <p>{{ tvStore.actor.birthday }}</p>
                </li>
                 <li>
                    <h4>Local de Nascimento:</h4>
                    <p>{{ tvStore.actor.place_of_birth }}</p>
                </li>
            </ul>

            <h3>Atores Relacionados</h3>
            <ul class="relatedList">
                <li 
                  v-for="a in tvStore.relatedActors" 
                  :key="a.realId"
                  class="relatedCard"
                  @click="goToActor(a.realId)"
                >
                  <p>{{ a.name }}</p>
                </li>
            </ul>
        </div> 
    </div>

    <div class="right">
        <h2>Participou em:</h2>
        <div class="grid">
            <div 
                v-for="item in tvStore.actorCredits" 
                :key="item.id" 
                class="card"
                @click="goToShow(item.id)"
            >
                <img 
                    :src="item.poster_path 
                        ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                        : '/img/default.jpg'"
                >
                <h4>{{ item.name }}</h4>
            </div>
        </div>
    </div>
   </section>

    <button class="voltar" @click="router.back()" style="display: block; margin-left: auto; margin-right: 4rem;">
        Voltar
    </button>
    <Loading v-model:active="isLoading" is-full-page />
</template>

<style scoped>
section{
    margin-left: 4vw;
    margin-right: 4vw;
    margin-top: 3vw;
}
#actor{
    display: flex;
}
#actorDetail{
    display: flex;
    justify-content: space-between;
}
img{
    width: 21vw;
    height:30vw;
    border-radius: 3%;
}
h2{
    margin-top: 2vw;
    font-family: "Turret Road";
    color: #4673A9;
    font-size: 3vw;
    margin-bottom: 3vw;
}
div.actorInfo{
    margin-left: 2.5vw;
}
li{
    list-style: none;
}
.separator {
    width: 90%;
    height: 2px;
    background-color: #b4c3d6;
    margin: 2vw 0;
}
.bio{
    width: 60%;
    margin-bottom: 3vw;
}
.right {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
h3{
    margin-top: 3vw;
    margin-bottom: 2vw;
}

.personalInfo ul {
    flex-direction: column;
    padding: 0;
}

.personalInfo li{
    width: 100%;
    margin-top: 2vw;
}
.personalInfo li p{
    margin-top: 0.5vw;
}

.relatedList {
    padding: 0;
    text-align: left;
}

.relatedCard {
    cursor: pointer;
}

.relatedCard p{
    color: #3A8FD7;
}

.relatedCard p:hover {
    text-decoration: underline;
}

.grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5vw;
    justify-items: center;
    margin-bottom: 4vw;
}

.card {
    width: 15vw;
    overflow: hidden;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}

.card:hover {
    transform: scale(1.05);
    filter: brightness(1.15);
}

.card img {
    width: 100%;
    height: 20vw;
    object-fit: cover;
}

.card h4 {
    margin-top: 0.7vw;
    font-size: 1.2vw;
    text-align: center;
}

.card p {
    text-align: center;
    font-size: 0.9vw;
    opacity: 0.8;
}
</style>
