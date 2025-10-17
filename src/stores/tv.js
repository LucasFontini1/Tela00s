import api from "@/plugins/axios";
import { reactive, computed } from "vue";
import { defineStore } from "pinia";

export const useTvStore = defineStore("tv", () => {
    const state = reactive({
        tv: [],
    });
    const tv = computed(() => state.tv);

    const fetchTv2000s = async () => {
        const response = await api.get(
            "discover/tv?language=pt-BR&sort_by=popularity.desc&first_air_date.gte=2000-01-01&first_air_date.lte=2009-12-31"
        );
        state.tv = response.data.results;
        console.log(state.tv);  
    }
    return {
        tv,
        fetchTv2000s,
    };
    
});