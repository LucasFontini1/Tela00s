<script setup>
import { ref, watch } from 'vue'
import { useTvStore } from '@/stores/tv'
import { RouterLink } from 'vue-router'
import debounce from 'just-debounce-it' // npm i just-debounce-it

const tvStore = useTvStore()
const searchText = ref('')
const results = ref([])
const loading = ref(false)

const doSearch = debounce(async (query) => {
  if (!query.trim()) {
    results.value = []
    return
  }
  loading.value = true
  try {
    const res = await tvStore.search2000s(query)
    results.value = res.slice(0, 10) 
  } catch (err) {
    console.error(err)
    results.value = []
  } finally {
    loading.value = false
  }
}, 300)

watch(searchText, (value) => {
  doSearch(value)
})
</script>

<template>
  <section class="fundo">
    <div class="escuro">
      <div class="search">
        <input
          type="text"
          v-model="searchText"
          placeholder="Pesquise por séries dos anos 2000..."
        />
        <span class="mdi mdi-magnify"></span>

        <ul v-if="results.length" class="searchResults">
          <li v-for="item in results" :key="item.id">
            <RouterLink :to="`/series/${item.id}`">{{ item.name }}</RouterLink>
          </li>
        </ul>

        <div v-if="loading" class="loading">Carregando...</div>
      </div>
    </div>
  </section>
</template>


<style scoped>
.fundo {
    background: url('/public/img/banner.jpg');
    height: 80vh;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}
.escuro {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
}

.search input {
    font-size: 1.6rem;
    padding: 1rem 2rem;
    width: 100%;
    padding-right: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
}

.search input:focus {
    outline: none;
    border-color: #777;
}

.search .mdi-magnify {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    font-size: 2rem;
    color: #aaa;
}
.searchResults {
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
  padding: 0;
  margin: 0;
  list-style: none;
}

.searchResults li {
  padding: 0.7rem 1rem;
  border-bottom: 1px solid #eee;
}

.searchResults li a {
  text-decoration: none;
  color: #4673A9;
  font-weight: bold;
  display: block;
}

.searchResults li:hover {
  background-color: #f0f0f0;
}

.loading {
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
</style>
