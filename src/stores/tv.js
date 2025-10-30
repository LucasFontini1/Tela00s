import api from "@/plugins/axios";
import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { useGenreStore } from "./genres";

export const useTvStore = defineStore("tv", () => {
    const genreStore = useGenreStore();
    const state = reactive({
        tv: [],
        tvWithGenres: [],
    });
    const tv = computed(() => state.tv);
    const tvWithGenres = computed(() => state.tvWithGenres);

    const fetchTv2000s = async () => {
        const response = await api.get(
            "discover/tv?language=pt-BR&sort_by=popularity.desc&first_air_date.gte=2000-01-01&first_air_date.lte=2009-12-31"
        );
        state.tv = response.data.results;
    }

    const fetchTvWithGenres = async () => {
        const response = await api.get(
            `discover/tv?language=pt-BR&sort_by=popularity.desc&first_air_date.gte=2000-01-01&first_air_date.lte=2009-12-31&with_genres=${genreStore.genresSelected.join(
                ","
            )}`
        );
        state.tvWithGenres = response.data.results;
        console.log(state.tvWithGenres);
    }

    return {
        tv,
        fetchTv2000s,
        tvWithGenres,
        fetchTvWithGenres,
    };
    
});