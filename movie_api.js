

async function get_movie(link,category,language) {
    try{
        let url = link;
        let key = "?api_key=00534acffecc10c137c8a38ea65a32d3";
        let movie_category = category;
        let movie_language = "language=" + language;
        
        url = url.concat(movie_category,key,"&",movie_language);
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch(e){
        return e;
    }
};

//   https://api.themoviedb.org/3/movie/popular?api_key=00534acffecc10c137c8a38ea65a32d3

export {get_movie};