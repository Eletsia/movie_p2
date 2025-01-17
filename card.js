import * as api from "./movie_api.js";

function preprocessing_data(data){
    let movie_data = Object.entries(data);
    movie_data = movie_data[1][1];
    return movie_data;
}
function make_card(data){
    document.getElementById('card_set').innerText = ' ';
    let movie_data = data;
    const movie_list = document.getElementById("card_set");

    movie_data.forEach(function (movie_data) {

        let image = movie_data['poster_path'];
        let title = movie_data['title'];
        let overview = movie_data['overview'];
        let rate = Math.floor(movie_data['vote_average'])/2; //5점만점 별점표시
        let genre = movie_data['genre_ids'];
        let id = movie_data['id'];

        if(overview === "")
            overview = "등록된 줄거리가 없습니다.";
        else
            overview = overview.substr(0,30) + "...";

        const temp = document.createElement("div");
        movie_list.appendChild(temp);

        temp.innerHTML = `<div class = "movie_card" id = "movie_card">
                <p class = "title">${title}</p>
                <img class = "movie_pic" src = "https://image.tmdb.org/t/p/w440_and_h660_face${image}"></p>
                <p class = "content">${overview}</p>
                <p class = "rate">평점 : ${rate}</p>
                <p class = "genre">장르 : ${genre}</p>
                <p class = "identity">${id}</p>
            </div>`;
        document.querySelector("#card_set").append(temp);
    });
    movie_list.addEventListener("click",show_details,false);
};

function search_movie(data,input){
    let movie_data = data;
    let search_input = input;
    let searched_movie;
    search_input.oninput = (e) =>{
        console.log(e.target.value);
        if(e.target.value !== ""){
            searched_movie = movie_data.filter((db) => db.title.includes(e.target.value));
            console.log(searched_movie);
            if(searched_movie.length === 0)
                make_card(movie_data);
            else if(searched_movie.length !== 0){
                make_card(searched_movie);
            }
        }
        else
            make_card(movie_data);
    }
};

async function show_details(e){
    document.getElementById('modal_content').innerText = ' ';
    document.querySelector('.modal').classList.remove('hide');
    console.log(document.querySelector('.modal'));
    console.log(document.querySelector('.modal').classList);
    var id = e.target.parentElement.lastElementChild.innerText;
    console.log(id);
    var data = await api.get_movie('https://api.themoviedb.org/3/movie/',id,'ko');
    var movie_data = data;
    console.log(movie_data);
    let image = movie_data['poster_path'];
    let title = movie_data['title'];
    let overview = movie_data['overview'];
    let rate = Math.floor(movie_data['vote_average'])/2; //5점만점 별점표시
    let genre = movie_data['genre_ids'];

    const temp = document.createElement("div");

    temp.innerHTML = `<div class = "movie_detail" id = "movie_detail">
            <button id = "modal_off" class = "modal_off">X</button>
            <p class = "title">${title}</p>
            <img class = "movie_pic" src="https://image.tmdb.org/t/p/w440_and_h660_face${image}"></p>
            <p class = "content">${overview}</p>
            <p class = "rate">평점 ${rate}</p>
        </div>
        </div>`;
    document.querySelector("#modal_content").append(temp);
    let modal_btn = document.getElementById("modal_off");
    modal_btn.addEventListener("click",modal_off);
    // https://api.themoviedb.org/3/movie/558449?api_key=00534acffecc10c137c8a38ea65a32d3
}

function modal_off(){
    document.querySelector('.modal').classList.add('hide');
}

export {make_card,preprocessing_data,search_movie,show_details,modal_off}