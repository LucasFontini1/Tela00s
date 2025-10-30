import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useGenreStore = defineStore('genre', () => {
    const state = reactive({
        genres: [],
        genresSelected: [],
    });

    const genres = computed(() => state.genres);
    const genresSelected = computed(() => state.genresSelected);

    const getGenreName = (id) =>
        state.genres.find((genre) => genre.id === id).name;

    const fetchGenres = async (type) => {
        const response = await api.get(`genre/${type}/list?language=pt-BR`);
        state.genres = response.data.genres;
    };

    const toggleGenreSelection = (genreId) => {
        const index = state.genresSelected.indexOf(genreId);
        if (index === -1) {
            state.genresSelected.push(genreId);
            console.log(`Genre selected: ${getGenreName(genreId)}`);
        } else {
            state.genresSelected.splice(index, 1);
            console.log(`Genre deselected: ${getGenreName(genreId)}`);
        }
    };
    console.log(state.genresSelected);

    return {
        genres,
        fetchGenres,
        getGenreName,
        genresSelected,
        toggleGenreSelection,
    };
});