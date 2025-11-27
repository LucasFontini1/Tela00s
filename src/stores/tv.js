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
    tvDetails: [],
    contentRating: '',
    tvCast: [],
    seasonDetails: [],
    actor: [],
    actorCredits: []
  })

  const tv = computed(() => state.tv)
  const tvWithGenres = computed(() => state.tvWithGenres)
  const totalPages = computed(() => state.totalPages)
  const currentPage = computed(() => state.currentPage)
  const tvDetails = computed(() => state.tvDetails)
  const contentRating = computed(() => state.contentRating)
  const tvCast = computed(() => state.tvCast)
  const seasonDetails = computed(() => state.seasonDetails)
  const actor = computed(() => state.actor)
  const actorCredits = computed(() => state.actorCredits)

  const fetchTv2000s = async () => {
    const response = await api.get(
      'discover/tv?language=pt-BR&sort_by=popularity.desc&first_air_date.gte=2000-01-01&first_air_date.lte=2009-12-31',
    )
    state.tv = response.data.results
  }

  const fetchTvWithGenres = async (page = 1) => {
    const response = await api.get(
      `discover/tv?language=pt-BR&sort_by=popularity.desc&first_air_date.gte=2000-01-01&first_air_date.lte=2009-12-31&with_genres=${genreStore.genresSelected.join(',')}&page=${page}`,
    )
    state.tvWithGenres = response.data
    state.currentPage = response.data.page
    state.totalPages = response.data.total_pages
  }

  const getTvDetails = async (id) => {
    const response = await api.get(`tv/${id}?language=pt-BR`)
    state.tvDetails = response.data

    const rating = await api.get(`tv/${id}/content_ratings?language=pt-BR`)
    const brRating = rating.data.results.find(r => r.iso_3166_1 === 'BR')

    const rawRating = brRating ? brRating.rating : rating.data.results[0]?.rating || 'N/A'
    const formatted = rawRating.replace(/[^\d+]/g, '')

    state.contentRating = formatted || rawRating

    const credits = await api.get(`tv/${id}/credits?language=pt-BR`)
    state.tvCast = credits.data.cast
  }

  const getSeasonDetails = async (id, seasonNumber) => {
    const response = await api.get(`tv/${id}/season/${seasonNumber}?language=pt-BR`)
    state.seasonDetails = response.data
  }

  const getActorDetails = async (id) => {
    const response = await api.get(`person/${id}?language=pt-BR`)
    state.actor = response.data
  }

  const getActorCredits = async (id) => {
    const response = await api.get(`person/${id}/tv_credits?language=pt-BR`)

    const filtered = response.data.cast.filter(item => {
      if (!item.first_air_date) return false
      const year = parseInt(item.first_air_date.substring(0, 4))
      return year >= 2000 && year <= 2009
    })

    filtered.sort((a, b) => b.popularity - a.popularity)

    state.actorCredits = filtered
  }

  return {
    tv,
    fetchTv2000s,
    tvWithGenres,
    fetchTvWithGenres,
    totalPages,
    currentPage,
    getTvDetails,
    tvDetails,
    contentRating,
    tvCast,
    seasonDetails,
    getSeasonDetails,
    getActorDetails,
    actor,
    actorCredits,
    getActorCredits
  }
})
