import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        Authorization: 'Bearer poe seu codigo da api aqui'
    }
});

export default api;