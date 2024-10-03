$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));

    fetch("pokedex.json")
        .then((rawData) => rawData.json())
        .then(pokedex => {
            const pokemon = pokedex.find(p => p.id == id);
            if (pokemon) {
                let name = pokemon["name"]["english"];
                let image = pokemon["image"]["hires"];
                let types = pokemon["type"];
                let firstType = types[0];
                let typesHtml = "";
                types.forEach(type => {
                    typesHtml += `<span class="${type}">${type}</span>`;
                });
                let stats = pokemon["base"];
                let species = pokemon["species"];
                species = species.replace(/Pokémon/gi, '');
                let description = pokemon.description
                let abilities = pokemon["profile"]["ability"]
                let abilitiesHtml = "";
                let abilitiesCount = abilities.length;
                abilities.forEach((ability, index) => {
                    abilitiesHtml += ability[0];
                    // Add a comma only if it's not the last ability
                    if (index < abilitiesCount - 1) {
                        abilitiesHtml += ', ';
                    }
                });
                let prevId = id > 1 ? id - 1 : null; 
                let nextId = id < pokedex.length ? id + 1 : null; 

                let prevPokemon = prevId !== null ? pokedex.find(p => p.id === prevId) : null;
                let nextPokemon = nextId !== null ? pokedex.find(p => p.id === nextId) : null;
              
                $('.pokemon-container').append(`
                    <table>
                        <thead>
                            <td class="pokemon-id previous" >
                                    ${prevPokemon ? `<a href="pokemon/pokemon.html?id=${prevId}"><img src="${prevPokemon["image"]["sprite"]}" alt="Previous Pokémon"></a>` : ''}
                            <td style="text-align: center";>${name}</td>
                            <td class="pokemon-id next">
                                <a href="pokemon/pokemon.html?id=${nextId}"><img src="${nextPokemon["image"]["sprite"]}"</a></td>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="card-holder ${firstType}">
                                        <img src="${image}" alt="${name}">
                                    </div>
                                </td>
                                <td>
                                    <ul>
                                        <li class="pokemon-id">Pokemon No. ${(10000 + id).toString().substring(1)}</li>
                                        <li class="pokemon-name">Name: ${name}</li>
                                        <li class="pokemon-type">Type: ${typesHtml}</li>
                                        <li class="pokemon-name">Species: ${species}</li>
                                        <li class="pokemon-type">Abilities: ${abilitiesHtml}</li>
                                    </ul>
                                </td>
                                <td>
                                    <ul class="right-align">
                                        <li>HP: ${stats["HP"]}</li>
                                        <li>Attack: ${stats["Attack"]}</li>
                                        <li>Defense: ${stats["Defense"]}</li>
                                        <li>Sp. Attack: ${stats["Sp. Attack"]}</li>
                                        <li>Sp. Defense: ${stats["Sp. Defense"]}</li>
                                        <li>Speed: ${stats["Speed"]}</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>`)
            }
        });
});
