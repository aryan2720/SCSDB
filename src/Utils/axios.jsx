import axios from "axios";

//Jo API key milegi vo hum hr request k sath bhejenge taki authenticated rhe 
const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2FhYTI5YmM3MDI2N2JhN2RhMjJjMDMzYjFlNTg3OCIsIm5iZiI6MTcyMzIxNjI2Ni41MjAxODksInN1YiI6IjY2YjM3ZTQwMjE1OTdiZTM0NzIwNTlmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zPqGPczWrBC7BjtsvNrj5zuUwGxPhafAgU2w4U8Uci8'
      }

})


export default instance 