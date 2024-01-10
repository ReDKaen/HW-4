const apiUrl = 'https://ajax.test-danit.com/api/swapi/films';
const filmsContainer = document.getElementById('films-container');

fetch(apiUrl)
.then(response => response.json())
.then(data => {

    data.forEach(film => {
        const filmElement = document.createElement('div');
        filmElement.innerHTML = `
            <h3>Episode ${film.episodeId}: ${film.name}</h3>
            <p>Opening Crawl: ${film.openingCrawl}</p>
            <div id="characters-${film.episodeId}"></div>
        `;
        
        filmsContainer.appendChild(filmElement);
        fetchCharacters(film.characters, film.episodeId);
    });
})
.catch(error => console.error('Error fetching films:', error));

function fetchCharacters(characterUrls, episodeId) {
const charactersContainer = document.getElementById(`characters-${episodeId}`);

characterUrls.forEach(characterUrl => {
    fetch(characterUrl)
        .then(response => response.json())
        .then(character => {

        const characterElement = document.createElement('p');
        characterElement.textContent = `   - ${character.name}`;

        charactersContainer.appendChild(characterElement);
        })
        .catch(error => console.error('Error fetching character:', error));
});
}
