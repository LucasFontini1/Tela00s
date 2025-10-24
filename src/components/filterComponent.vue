<script setup>
import { ref } from 'vue'
import { useGenreStore } from '@/stores/genres'

const

const isOpen = ref(false)
const openYears = ref(false)
const openGenres = ref(false)



function toggleFilter() {
  isOpen.value = !isOpen.value
}
function toggleYears() {
  openYears.value = !openYears.value
}
function toggleGenres() {
  openGenres.value = !openGenres.value
}
</script>

<template>
  <section class="filter">
    <div class="alwais-open" @click="toggleFilter">
      <span class="mdi menu" :class="isOpen ? 'mdi-menu-close' : 'mdi-menu'"></span>
      <h2>Filtrar</h2>
    </div>

    <transition name="fade-slide">
      <div v-if="isOpen" class="year-genres">
        <button @click="toggleYears()" class="year">ANOS</button>
        <button @click="toggleGenres()" class="genres">GÊNEROS</button>
      </div>
    </transition>
        <div class="genres" v-if="openGenres">
            <p>Gêneros</p>
            <ul>
                <li>
                    {{  }}
                </li>
            </ul>
        </div>
  </section>
</template>

<style scoped>
.filter {
  padding: 20px;
  background-color: #1b5eb8;
  width: 20%;
  margin: 0 auto;
  text-align: center;
  color: white;
  min-width: 450px;
  margin-top: 4rem;
  border-radius: 10px;
}

.alwais-open {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  justify-content: center;
  margin: 0 auto;
  width: 30%;
  min-width: 200px;
  padding: 10px;
}
.alwais-open:hover {
  background-color: #0f3363;
  border-radius: 5px;
  transition: background-color 0.3s ease;
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
}
.year:hover,
.genres:hover {
  background-color: #0f3363;
  transition: background-color 0.3s ease;
}

/* Transição */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
