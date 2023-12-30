const api_key = "efa9b119833336ee64968acdb71e875d"; 
const link = "https://image.tmdb.org/t/p/w440_and_h660_face";
const container = document.getElementById("upcoming-movie");
const searchInput = document.getElementById("search"); 

const displayMovies = async (movies) => {
    container.innerHTML = "";


    movies.forEach(({ backdrop_path, original_title, release_date }) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("content");
        movieCard.innerHTML = `
            <img src="${link}${backdrop_path}" alt="${original_title} Poster">
            <p>${original_title}</p>
            <small>Release Date: ${release_date}</small>
        `;
        container.appendChild(movieCard);
    });
};

const fetchUpcomingMovies = async () => {
    try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`);
        const { results } = res.data;
        displayMovies(results);
    } catch (error) {
        console.error(error);
    }
};
//for my searching
const searchMovies = async (title) => {
    try {
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${title}`);
        const { results } = res.data;
        displayMovies(results);
    } catch (error) {
        console.error(error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    fetchUpcomingMovies(); 
});

document.getElementById("searchs").addEventListener("click", () => {
    const searchValue = searchInput.value.trim();
    if (searchValue !== "") {
        searchMovies(searchValue);
    } else {
        
        fetchUpcomingMovies();
    }
});
