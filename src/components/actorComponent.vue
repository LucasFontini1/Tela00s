<script setup>
import { defineProps, onMounted } from 'vue';
import { useTvStore } from '@/stores/tv';

const props = defineProps({
    id: {
        type: Number
    }
})

const tvStore = useTvStore()

onMounted(async () => {
    await tvStore.getActorDetails(props.id)
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
    <div>
        <h2>
            {{ tvStore.actor.name }}
        </h2>
        <p>
            {{ tvStore.actor.biography }}
        </p>
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
                    <p>{{ tvStore.actor.gender }}</p>
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
        </div>
    </div>
   </section>
</template>