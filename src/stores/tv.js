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
    tvDetails: [],
    contentRating: '',
    tvCast: [],
    seasonDetails: []
  })

  const tv = computed(() => state.tv)
  const tvWithGenres = computed(() => state.tvWithGenres)
  const totalPages = computed(() => state.totalPages)
  const currentPage = computed(() => state.currentPage)
  const yearsSelected = computed(() => state.yearsSelected)
  const tvDetails = computed(() => state.tvDetails)
  const contentRating = computed(() => state.contentRating)
  const tvCast = computed(() => state.tvCast)
  const seasonDetails = computed(() => state.seasonDetails)

  const fetchTv2000s = async () => {
    const response = await api.get('discover/tv?language=pt-BR&sort_by=popularity.desc&first_air_date.gte=2000-01-01&first_air_date.lte=2009-12-31')
    state.tv = response.data.results
  }

  const search2000s = async (query) => {
    const response = await api.get(`search/tv?query=${query}&language=pt-BR`)
    const filtered = response.data.results.filter(tv => {
      if (!tv.first_air_date) return false
      const year = Number(tv.first_air_date.slice(0, 4))
      return year >= 2000 && year <= 2009
    })
    return filtered
  }

  const toggleYearSelection = (year) => {
    const index = state.yearsSelected.indexOf(year)
    if (index > -1) state.yearsSelected.splice(index, 1)
    else state.yearsSelected.push(year)
  }

  const fetchTvWithGenres = async (page = 1) => {
    const selectedYears = state.yearsSelected
    let results = []

    if (selectedYears.length === 0) {
      const response = await api.get(`discover/tv?language=pt-BR&sort_by=popularity.desc&first_air_date.gte=2000-01-01&first_air_date.lte=2009-12-31&with_genres=${genreStore.genresSelected.join(',')}&page=${page}`)
      results = response.data.results
      state.currentPage = response.data.page
      state.totalPages = response.data.total_pages
    } else {
      for (const year of selectedYears) {
        const response = await api.get(`discover/tv?language=pt-BR&sort_by=popularity.desc&first_air_date_year=${year}&with_genres=${genreStore.genresSelected.join(',')}&page=1`)
        results.push(...response.data.results)
      }
      results = Array.from(new Set(results.map(s => s.id))).map(id => results.find(s => s.id === id))
      state.currentPage = 1
      state.totalPages = 1
    }

    results.sort((a, b) => b.popularity - a.popularity)
    state.tvWithGenres = { results }
  }

  const getTvDetails = async (id) => {
    const response = await api.get(`tv/${id}?language=pt-BR`)
    state.tvDetails = response.data

    const rating = await api.get(`tv/${id}/content_ratings?language=pt-BR`)
    const br = rating.data.results.find(r => r.iso_3166_1 === 'BR')
    const raw = br ? br.rating : rating.data.results[0]?.rating || 'N/A'
    state.contentRating = raw.replace(/[^\d+]/g, '') || raw

    const credits = await api.get(`tv/${id}/credits?language=pt-BR`)
    state.tvCast = credits.data.cast
  }

  const getSeasonDetails = async (id, season) => {
    const response = await api.get(`tv/${id}/season/${season}?language=pt-BR`)
    state.seasonDetails = response.data
  }

  const getTvTrailer = async (id) => {
    const response = await api.get(`tv/${id}/videos?language=pt-BR`)
    const trailer = response.data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null
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
    search2000s,
    getTvDetails,
    tvDetails,
    contentRating,
    tvCast,
    seasonDetails,
    getSeasonDetails,
    getTvTrailer
  }
})
