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
      <button>
        Ver mais
      </button>
    </div>
  </section>

  <Loading v-model:active="isLoading" is-full-page />
</template>

<style scoped>
.recomendation {
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: end;
  color: white;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.info {
  z-index: 2;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  width: 60%;
}
.info h2 {
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Turret Road', sans-serif;
}
.info p {
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Actor', sans-serif;
}
.info button {
  width: 30%;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #6699D4;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 auto;
}
.info button:hover {
  background-color: #4673A9;
}

</style>
