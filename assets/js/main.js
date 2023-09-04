const pokemonList = document.querySelector("#pokemons-list");
const loadMoreBtn = document.querySelector(".loadMore");
const maxRecord = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
    <li class="pokemon ${pokemon.types[0]}">
      <ol class="types">
        ${pokemon.types
          .map(
            (type) => `<li class="type">
          <img src="./assets/img/icons/${type}.svg" alt="${type} icon type">
            </li>`
          )
          .join("")}
      </ol>

      <div class="pokemon-image">
        <img src="${pokemon.photo}" alt="${pokemon.name}">
      </div>

      <div class="poke-text">
        <span class="name">${pokemon.name}</span>
        <span class="number">#${pokemon.number}</span>
      </div>
  </li>`;
}

function HandleLoadMore(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join("");
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
