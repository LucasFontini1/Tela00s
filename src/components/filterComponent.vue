<script setup>
import { ref, onMounted } from 'vue'
import { useGenreStore } from '@/stores/genres'
import { useTvStore } from '@/stores/tv'

const genreStore = useGenreStore()
const tvStore = useTvStore()

const isOpen = ref(false)
const openYears = ref(false)
const openGenres = ref(false)

function toggleFilter() {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    openYears.value = false
    openGenres.value = false
  }
}
function toggleYears() {
  openYears.value = !openYears.value
  openGenres.value = false
}
function toggleGenres() {
  openGenres.value = !openGenres.value
  openYears.value = false
}
onMounted(() => {
  genreStore.fetchGenres('tv');
});
</script>

<template>
  <section class="filter" :class="{ open: isOpen }">
    <div class="alwais-open" @click="toggleFilter">
      <span class="mdi menu" :class="isOpen ? 'mdi-menu-close' : 'mdi-menu'"></span>
      <h2>Filtrar</h2>
    </div>

    <transition name="fade-slide">
      <div v-if="isOpen" class="year-genres">
        <button v-if="!openGenres" @click="toggleYears()" class="year">ANOS</button>
        <button @click="toggleGenres()" class="genres" :class="{ wide: isOpen }">GÊNEROS</button>
      </div>
    </transition>

    <div class="genresList" v-if="openGenres">
      <ul>
        <li v-for="genres in genreStore.genres" :key="genres.id">
          <input type="checkbox" :id="`genre-${genres.id}`" :checked="genreStore.genresSelected.includes(genres.id)" @change="genreStore.toggleGenreSelection(genres.id)" />
          <label :for="`genre-${genres.id}`">{{ genres.name }}</label>
        </li>
      </ul>
      <button @click="tvStore.fetchTvWithGenres()">Filtrar</button>
      <button @click="toggleGenres()">Fechar</button>
    </div>
  </section>
</template>

<style scoped>
.filter {
  background-color: #1b5eb8;
  margin-left: 7rem;
  text-align: center;
  color: white;
  margin-top: 4rem;
  border-radius: 10px;
  width: 10%;
  transition: width 0.5s ease;
  overflow: hidden;
}

.filter.open {
  width: 40%;
}

.alwais-open {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
}

.alwais-open:hover {
  background-color: #0f3363;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}
.filter.open .alwais-open {
  width: 30%;
}

.menu {
  font-size: 2rem;
}

.year-genres {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.year,
.genres {
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Krona One', sans-serif;
  background-color: #1b5eb8;
  color: white;
  transition: width 0.3s ease;
}

.year:hover,
.genres:hover {
  background-color: #0f3363;
}

.genres.wide {
  width: 30%;
}

.genresList {
  margin-top: 20px;
  text-align: center;
}

.genresList ul {
  list-style: none;
  padding: 0;
  overflow-wrap: break-word;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.genresList li {
  margin-bottom: 10px;
  font-size: 1rem;
  width: 30%;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #0f3363;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}

.genresList li label {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.genresList input[type="checkbox"] {
  width: 16px;
  height: 16px;
  border: #fff 2px solid;
  background-color: #1b5eb8;
  cursor: pointer;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

button {
  margin: 10px 0;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #1b5eb8;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Krona One', sans-serif;
}

button:hover {
  background-color: #0f3363;
  transition: background-color 0.3s ease;
}

label {
  width: 100%;
  text-align: left;
  cursor: pointer;
}
</style>
