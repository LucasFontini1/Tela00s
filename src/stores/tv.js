import api from '@/plugins/axios'
import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useGenreStore } from './genres'

export const useTvStore = defineStore('tv', () => {
  const genreStore = useGenreStore()

  const state = reactive({
    tv: [],
    tvWithGenres: [],
    currentPage: 1,
    totalPages: 0,
    yearsSelected: [],
  })

  const tv = computed(() => state.tv)
  const tvWithGenres = computed(() => state.tvWithGenres)
  const totalPages = computed(() => state.totalPages)
  const currentPage = computed(() => state.currentPage)
  const yearsSelected = computed(() => state.yearsSelected)

  const fetchTv2000s = async () => {
    const response = await api.get(
      'discover/tv?language=pt-BR&sort_by=popularity.desc&first_air_date.gte=2000-01-01&first_air_date.lte=2009-12-31',
    )
    state.tv = response.data.results
  }

  const toggleYearSelection = (year) => {
    const index = state.yearsSelected.indexOf(year)
    if (index > -1) {
      state.yearsSelected.splice(index, 1)
    } else {
      state.yearsSelected.push(year)
    }
  }

  const getYearRange = () => {
    if (state.yearsSelected.length === 0) {
      // padrão
      return {
        gte: '2000-01-01',
        lte: '2009-12-31',
      }
    }
    const minYear = Math.min(...state.yearsSelected)
    const maxYear = Math.max(...state.yearsSelected)

    return {
      gte: `${minYear}-01-01`,
      lte: `${maxYear}-12-31`,
    }
  }

  const fetchTvWithGenres = async (page = 1) => {
    const selectedYears = state.yearsSelected

    let results = []

    if (selectedYears.length === 0) {
      const response = await api.get(
        `discover/tv?language=pt-BR&sort_by=popularity.desc&first_air_date.gte=2000-01-01&first_air_date.lte=2009-12-31&with_genres=${genreStore.genresSelected.join(',')}&page=${page}`,
      )
      results = response.data.results
      state.currentPage = response.data.page
      state.totalPages = response.data.total_pages
    } else {
      for (const year of selectedYears) {
        const response = await api.get(
          `discover/tv?language=pt-BR&sort_by=popularity.desc&first_air_date_year=${year}&with_genres=${genreStore.genresSelected.join(',')}&page=1`,
        )

        results.push(...response.data.results)
      }

      results = Array.from(new Set(results.map((s) => s.id))).map((id) =>
        results.find((s) => s.id === id),
      )

      state.currentPage = 1
      state.totalPages = 1
    }

    results.sort((a, b) => b.popularity - a.popularity)
    state.tvWithGenres = { results }
  }

  return {
    tv,
    tvWithGenres,
    fetchTvWithGenres,
    totalPages,
    currentPage,
    yearsSelected,
    toggleYearSelection,
    fetchTv2000s,
  }
})
