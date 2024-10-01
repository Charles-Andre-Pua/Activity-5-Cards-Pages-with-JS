$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    fetch("pokedex.json")
        .then((rawData) => rawData.json())
        .then(pokedex => {
            const pokemon = pokedex.find(p => p.id == id);
            if (pokemon) {
                let name = pokemon["name"]["english"];
                let image = pokemon["image"]["hires"];
                let types = pokemon["type"].join(', ');
                let stats = pokemon["base"];

                $('.pokemon-image').html(`<img src="${image}" alt="${name}">`);
                $('.pokemon-info').html(`
                    <h1>${name}</h1>
                    <p>Types: ${types}</p>
                    <h2>Stats:</h2>
                    <ul>
                        <li>HP: ${stats["HP"]}</li>
                        <li>Attack: ${stats["Attack"]}</li>
                        <li>Defense: ${stats["Defense"]}</li>
                        <li>Speed: ${stats["Speed"]}</li>
                    </ul>
                `);
            }
        });
});
