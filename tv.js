const api_key = "efa9b119833336ee64968acdb71e875d";
const link = "https://image.tmdb.org/t/p/w440_and_h660_face";
const seriesContainer = document.getElementById("series");

const displaySeries = async () => {
    try {
        const res = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`);
        const { results } = res.data;

        const seriesCards = results.map(({ poster_path, name }) => (`
            <div class="content">
                <img src="${link}${poster_path}" alt="${name} Poster">
                <p>${name}</p>
            </div>`)).join('');

        seriesContainer.innerHTML = seriesCards;
    } catch (error) {
        console.log(error);
    }
};

const searchSeries = async (title) => {
    try {
        const res = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${title}`);
        const { results } = res.data;

        const seriesCards = results.map(({ poster_path, name }) => (`
            <div class="content">
                <img src="${link}${poster_path}" alt="${name} Poster">
                <p>${name}</p>
            </div>`)).join('');
            console.log(seriesContainer);
        seriesContainer.innerHTML = seriesCards;
    } catch (error) {
        console.error(error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("search").addEventListener("click", () => {
        const searchValue = searchInput.value.trim();
        if (searchValue !== "") {
            searchSeries(searchValue);
        }
    });
    displaySeries();
});

displaySeries();


