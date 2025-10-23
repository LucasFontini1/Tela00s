<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTvStore } from '@/stores/tv'
import Loading from 'vue-loading-overlay'

const isLoading = ref(false)
const tvStore = useTvStore()
const serie = ref(null)

onMounted(async () => {
  isLoading.value = true
  await tvStore.fetchTv2000s()
  const totalSeries = tvStore.tv.length
  if (totalSeries > 0) {
    const indiceAleatorio = Math.floor(Math.random() * totalSeries)
    serie.value = tvStore.tv[indiceAleatorio]
  }

  isLoading.value = false
})
</script>

<template>
  <section v-if="serie" class="recomendation">
    <div class="fundo">
      <img
        :src="`https://image.tmdb.org/t/p/original${serie.backdrop_path}`"
        :alt="serie.name"
      />
    </div>
  </section>

  <Loading v-model:active="isLoading" is-full-page />
</template>
