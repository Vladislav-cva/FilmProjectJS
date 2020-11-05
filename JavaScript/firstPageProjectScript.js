
let input = document.getElementById('val_input');
input.addEventListener('keydown', function(event){
    const request = getRequest(event.target.value ? event.target.value : '');
    renderFilms(request);
})


function getRequest(query) {
    let requestServer = new XMLHttpRequest();
    requestServer.open('GET', `https://api.tvmaze.com/search/shows?q=${query}`);
    requestServer.responseType = 'json';
    requestServer.send();
    return requestServer;
}
//Функция для рендера фильмов, которая принимает в себя сам запрос
function renderFilms(server) {
    if (server) {
        server.onload = function (){
            spawnFims(server.response)
        };
    } else {
        alert('Упс! Проблема!')
    }
}
//Перебирает объект который нам возвращает XMLHtt-запрос и создает разметку под вернувшиеся объекты
function addElem(tagName, container) {
    return container.appendChild(document.createElement('tagName'))
}

let spawnFims = function(films) {
    films.forEach(element => {
        //let filmArea = document.createElement('div');
         //filmArea.className = 'filmArea';
         addElem('div', filmArea)
        let parentFilm = document.getElementById('parentFilm')
         parentFilm.appendChild(filmArea)
        //let imageBlock = document.createElement('div');
         //imageBlock.className = 'imageBlock';
         addElem('div', filmArea).className = 'imageBlock'
         //filmArea.appendChild(imageBlock);
        let image = document.createElement('img');
         image.className = "image";
         imageBlock.appendChild(image);
         image.setAttribute('src', element.show.image ? element.show.image.original : ' ');
        let discriptionFilm = document.createElement('div');
         discriptionFilm.className = 'discriptionFilm';
         filmArea.appendChild(discriptionFilm);
         // Описание для фильмов в discriptionFilm = H3
        let paragrafs = document.createElement('h3');
         discriptionFilm.appendChild(paragrafs);
         paragrafs.innerHTML =  element.show.summary;
        const nameFilm = document.createElement('H3');
        discriptionFilm.appendChild(nameFilm);
         nameFilm.innerHTML = element.show.name;
        let genres = document.createElement('h3');
         discriptionFilm.appendChild(genres);
         genres.innerHTML = element.show.genres;
        let rating = document.createElement('h3');
         discriptionFilm.appendChild(rating);
         rating.innerHTML = element.show.rating.average;
        let urlLink = document.createElement('h3');
         discriptionFilm.appendChild(urlLink);
         urlLink.innerHTML = element.show.url;
    });
} 
