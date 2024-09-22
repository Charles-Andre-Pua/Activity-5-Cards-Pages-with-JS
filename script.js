$(document).ready(function () {

    fetch("pokedex.json")
        .then((rawData) => rawData.json())
        .then(pokedex => {



            let linkID =0;
            pokedex.forEach(pokemon => {

                let id = pokemon["id"];
                let name = pokemon["name"]["english"];
                let image = pokemon["image"]["thumbnail"];
                let types = pokemon["type"];
                let firstType = types[0];
                let typesHtml = "";

                types.forEach(type => {
                    typesHtml += `<span class="${type}">${type}</span>`;
                });


                $('.pokemon-container').append(
`                    <div class="card ${firstType}">
                        <div class="card-holder ${firstType}">
                            <img src="${image}" class="hires-image" alt="${name}">
                        </div>
                            <ul type="none">
                                <li class="pokemon-id">#${id}</li>
                                <li class="pokemon-name">${name}</li>
                                <li class="pokemon-type">${typesHtml}</li>
                            </ul>
                    </div>`
                )

                console.log(typesHtml)
            });




        });



}
)