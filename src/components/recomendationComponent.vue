<script setup>
import { ref, onMounted } from 'vue'
import { useTvStore } from '@/stores/tv'
import Loading from 'vue-loading-overlay'
import api from '@/plugins/axios'

const isLoading = ref(false)
const tvStore = useTvStore()
const serie = ref(null)
const backGroundImage = ref(null)

onMounted(async () => {
  isLoading.value = true
  await tvStore.fetchTv2000s()

  const totalSeries = tvStore.tv.length
  if (totalSeries > 0) {
    const indiceAleatorio = Math.floor(Math.random() * totalSeries)
    serie.value = tvStore.tv[indiceAleatorio]
  }

  if (serie.value) {
    const response = await api.get(`tv/${serie.value.id}/images`)
    backGroundImage.value = response.data.backdrops[0]
  }

  isLoading.value = false
})
</script>

<template>
  <section
    v-if="serie && backGroundImage"
    class="recomendation"
    :style="{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/original${backGroundImage.file_path})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }"
  >
    <div class="info">
      <h2>{{ serie.name }}</h2>
      <p>{{ serie.overview }}</p>
    </div>
  </section>

  <Loading v-model:active="isLoading" is-full-page />
</template>

<style scoped>
.recomendation {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: end;
  color: white;
  padding: 2rem;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.info {
  z-index: 2;
  position: relative;
}

.recomendation::after {
  /* leve camada de sombra extra, tipo Netflix */
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.9));
  border-radius: 20px;
}
</style>
