<script setup>
import { useTvStore } from '@/stores/tv'
import { useGenreStore } from '@/stores/genres'
import { ref, onMounted } from 'vue'

const tvStore = useTvStore()
const genreStore = useGenreStore()

const isOpen = ref(false)
const yearOpen = ref(false)
const genreOpen = ref(false)

onMounted(async () => {
  await genreStore.fetchGenres('tv')
})
</script>
<template>
  <section class="filtro">
    <div class="filter">
      <div class="alwais-open">
        <h2 @click="isOpen = !isOpen">
          <span class="mdi mdi-menu"></span><span>Filtrar</span>
        </h2>
      </div>

      <div class="year-genre" v-if="isOpen">
        <div class="year">
          <h3 @click="yearOpen = !yearOpen">
            <span class="ball" v-if="!yearOpen"></span>
            <span class="ballTwo" v-if="yearOpen"><span class="selected"></span></span>
            <span>Anos</span>
          </h3>
        </div>

        <div class="genre">
          <h3 @click="genreOpen = !genreOpen">
            <span class="ball" v-if="!genreOpen"></span>
            <span class="ballTwo" v-if="genreOpen"><span class="selected"></span></span>
            <span>Genêros</span>
          </h3>

          <div class="genreOpened" v-if="genreOpen">
            <ul>
              <li v-for="genre in genreStore.genres" :key="genre.id">
                <input
                  type="checkbox"
                  :id="'genre' + genre.id"
                  :value="genre.id"
                  :checked="genreStore.genresSelected.includes(genre.id)"
                  @change="genreStore.toggleGenreSelection(genre.id)"
                />
                <label :for="'genre' + genre.id">{{ genre.name }}</label>
              </li>
            </ul>
          </div>
        </div>
        <div class="filtrar">
          <h3 @click="tvStore.fetchTvWithGenres()">
            Filtrar
          </h3>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.filtro {
  margin-top: 2rem;
  width: 12%;
  margin-left: 2rem;
  background-color: #4673A9;
  color: white;
  border-radius: 5px;
  font-family: sans-serif;
}

.filter h2 {
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  height: 3rem;
}

.filter h2 span.mdi {
  margin-right: 0.5rem;
  font-size: 1.5rem;
}

.year-genre {
  padding: 1rem;
}

.ball, .ballTwo {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.5rem;
  background-color: #fff;
  position: relative;
}

.selected {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #4673A9;
  position: absolute;
  top: 25%;
  left: 25%;
  transition: all 0.2s;
}

.genreOpened {
  margin-top: 1rem;
  max-height: 200px;
  overflow-y: auto;
  transition: max-height 0.3s ease;
}

.genreOpened ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.genreOpened li {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.genreOpened input[type="checkbox"] {
  cursor: pointer;
}

.genreOpened label {
  margin-left: 0.5rem;
  cursor: pointer;
}

.genreOpened::-webkit-scrollbar {
  width: 8px;
}

.genreOpened::-webkit-scrollbar-track {
  background: #4673A9;
}

.genreOpened::-webkit-scrollbar-thumb {
  background: #fff;
  border-radius: 4px;
}

.genreOpened::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}
.filtrar {
  margin-top: 0.5rem;
  border-radius: 5px;
  padding: 5px;
}
.filtrar:hover{
  background-color: #6699D4;
  cursor: pointer;
}
</style>