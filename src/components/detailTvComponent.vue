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
        <img v-if="tvStore.tvDetails.poster_path"
            :src="`https://image.tmdb.org/t/p/w500${tvStore.tvDetails.poster_path}`" :alt="tvStore.tvDetails.name">
            <div class="detalhes">
                <h2>{{ tvStore.tvDetails.name }}</h2>
            </div>
    </section>
</template>
