<script setup>
import { useTvStore } from '@/stores/tv'
import { ref } from 'vue'

const tvStore = useTvStore()

const inputPage = ref('')

const goToPage = () => {
    const pageNum = Number(inputPage.value)
    if (pageNum >= 1 && pageNum <= tvStore.totalPages) {
        tvStore.fetchTvWithGenres(pageNum)
        inputPage.value = ''
    } else {
        alert(`Digite um número entre 1 e ${tvStore.totalPages}`)
    }
}

const selectPage = (pageNum) => {
    tvStore.fetchTvWithGenres(pageNum)
}


</script>

<template>
    <section id="filteredTvs">
        <ul>
            <li v-for="tv in tvStore.tvWithGenres.results" :key="tv.id" class="tv-card">
                <div class="card-container">
                    <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.name" />
                    <div class="dark-overlay"></div>
                    <div class="overlay">
                        <h3>{{ tv.name }}</h3>
                        <p>{{ new Date(tv.first_air_date).toLocaleDateString('pt-BR') }}</p>
                        <h6>{{ Math.round(tv.vote_average * 10) }}%</h6>
                    </div>
                </div>
            </li>
        </ul>
    </section>

    <section id="selectPages" v-if="tvStore.totalPages > 1">
        <div class="pagination">
            <button v-for="page in 3" :key="page" :class="{ active: tvStore.currentPage === page }"
                @click="selectPage(page)">
                {{ page }}
            </button>

            <span>...</span>

            <button :class="{ active: tvStore.currentPage === tvStore.totalPages }"
                @click="selectPage(tvStore.totalPages)">
                {{ tvStore.totalPages }}
            </button>

            <input type="number" min="1" :max="tvStore.totalPages" v-model="inputPage" placeholder="Selecionar página"
                @keydown.enter.prevent="goToPage" />
            <button @click="goToPage">Ir</button>
        </div>
    </section>
</template>

<style scoped>
#filteredTvs ul {
    display: flex;
    flex-wrap: wrap;
    gap: 2.5rem;
    list-style: none;
    justify-content: center;
    padding: 2rem 0;
}

li.tv-card {
    width: 13%;
    position: relative;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 5px 5px 10px #4673a9ad;
    transition: all 0.3s ease;
    height: 50vh;
}

.tv-card:hover {
    transform: translateY(-6px);
    box-shadow: 6px 6px 15px rgba(27, 94, 184, 0.8);
}

.card-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.tv-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.dark-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.55);
    z-index: 1;
    transition: background-color 0.3s ease;
}

.tv-card:hover .dark-overlay {
    background-color: rgba(0, 0, 0, 0.7);
}

.overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    color: white;
    padding: 1.5rem 0 0.5rem 0.5rem;
    font-family: 'Nunito', sans-serif;
    z-index: 2;
}

.overlay h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 700;
    text-align: center;
}

.overlay p {
    margin: 0.2rem 0;
    font-size: 0.8rem;
    text-align: center;
}

.overlay h6 {
    font-size: 0.6rem;
    font-weight: 600;
    text-align: center;
}

/*Paginas */

.pagination {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
}

.pagination button {
  background-color: #6699D4;
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.pagination button:hover {
  background-color: #4673A9;
}

.pagination button:disabled {
  background-color: #9bb9f3;
  cursor: default;
}

.pagination button.active {
  background-color: #4673A9;
}

.pagination input[type='number'] {
  width: 10%;
  opacity: 1;
  text-align: center;
  border: none;
  background-color: #4673A9;
  color: #fff;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem; 
}
.pagination input[type='number']::placeholder {
  color: #fff;
  opacity: 1; 
}

/* Remover as setinhas */
.pagination input[type='number']::-webkit-outer-spin-button,
.pagination input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.pagination input[type='number'] {
  -moz-appearance: textfield;
}
</style>
