
const input = document.getElementById('val_input');
input.addEventListener('keydown', function(event){
    const request = getRequest(event.target.value ? event.target.value : '');
    renderFilms(request);
})


function getRequest(query) {
    const requestServer = new XMLHttpRequest();
    requestServer.open('GET', `https://api.tvmaze.com/search/shows?q=${query}`);
    requestServer.responseType = 'json';
    requestServer.send();
    return requestServer;
}
function renderFilms(server) {
    if (server) {
        server.onload = function (){
            spawnFims(server.response)
        };
    } else {
        alert('Упс! Проблема!')
    }
}
function addElem(tagName, container) {
    return container.appendChild(document.createElement('tagName'))
}

let spawnFims = function(films) {
    films.forEach(element => {
        const parentFilm = document.getElementById('parentFilm')
        const image = document.createElement('img');
        const discriptionFilm = document.createElement('div');
        const paragrafs = document.createElement('h3');
        const nameFilm = document.createElement('H3');
        const genres = document.createElement('h3');
        const rating = document.createElement('h3');
        const urlLink = document.createElement('h3');
        //let filmArea = document.createElement('div');
        //filmArea.className = 'filmArea';
            addElem('div', filmArea)
            parentFilm.appendChild(filmArea)
        //let imageBlock = document.createElement('div');
        //imageBlock.className = 'imageBlock';
            addElem('div', filmArea).className = 'imageBlock'
        //filmArea.appendChild(imageBlock);
            image.className = "image";
            imageBlock.appendChild(image);
            image.setAttribute('src', element.show.image ? element.show.image.original : ' ');
            discriptionFilm.className = 'discriptionFilm';
            filmArea.appendChild(discriptionFilm);
        // Описание для фильмов в discriptionFilm = H3
            discriptionFilm.appendChild(paragrafs);
            paragrafs.innerHTML =  element.show.summary;
            discriptionFilm.appendChild(nameFilm);
            nameFilm.innerHTML = element.show.name;
            discriptionFilm.appendChild(genres);
            genres.innerHTML = element.show.genres;
            discriptionFilm.appendChild(rating);
            rating.innerHTML = element.show.rating.average;
            discriptionFilm.appendChild(urlLink);
            urlLink.innerHTML = element.show.url;
    });
} 
