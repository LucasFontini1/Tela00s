import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmUzZTZhZGJmNzY0NzIyNDg0MWZhZWE1MjI5OWViMSIsIm5iZiI6MTc1OTI2NzcwMy42MjcsInN1YiI6IjY4ZGM0Yjc3ZjMzYzc3OTBhZjUzMTIxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8_1_vYhKkzKHr0u7d9k1XlCclAihOgszwE1CIFIeATs'
    }
});

export default api;