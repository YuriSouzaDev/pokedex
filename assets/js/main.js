const pokemonList = document.querySelector("#pokemons-list");
const loadMoreBtn = document.querySelector(".loadMore");
const maxRecord = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
    <li class="pokemon ${pokemon.types[0]}">
      <div class="poke-header">
         <span class="number">#${pokemon.number}</span>
         <span class="name">${pokemon.name}</span>
      </div>
    <div class="details">
        <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
        </ol>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
  </li>`;
}

function HandleLoadMore(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join(""); // usar no site da fipe
  });
}

HandleLoadMore(offset, limit);

loadMoreBtn.addEventListener("click", () => {
  offset += limit;
  const recordNextPage = offset + limit;

  if (recordNextPage >= maxRecord) {
    const newLimit = maxRecord - offset;
    HandleLoadMore(offset, newLimit);
    loadMoreBtn.parentElement.removeChild(loadMoreBtn);
    return;
  } else {
    HandleLoadMore(offset, limit);
  }
});
