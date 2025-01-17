import * as api from "./movie_api.js";
import * as card from "./card.js";

console.log(api.get_movie('https://api.themoviedb.org/3/movie/','popular','ko'));

let data= await api.get_movie('https://api.themoviedb.org/3/movie/','popular','ko');
console.log(data['results']);
let input = document.getElementById("search");


card.make_card(card.preprocessing_data(data));
card.search_movie(card.preprocessing_data(data),input);

