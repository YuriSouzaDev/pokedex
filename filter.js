const types = document.querySelectorAll(".list-filter li");
const typesImage = document.querySelectorAll(".list-filter li img");

function HandleVisibility(e) {
  typesImage.forEach((element) => {
    element.classList.remove("active");
  });
  this.classList.toggle("active");
}

typesImage.forEach((element) => {
  element.addEventListener("click", HandleVisibility);
});

async function handleType(event) {
  const valueType = event.currentTarget.getAttribute("value");
  const urlType = `https://pokeapi.co/api/v2/type/${valueType}/`;
  const typeJson = await fetchJSON(urlType);
  const pokemons = typeJson.pokemon;

  pokemonList.innerHTML = "";

  for (let i = 0; i < pokemons.length; i++) {
    const pokemonData = pokemons[i].pokemon;
    const pokemonURL = pokemonData.url;
    const pokemonDetail = await fetchJSON(pokemonURL);
    const pokemon = convertPokeApiDetail(pokemonDetail);
    pokemonList.innerHTML += pokemonToLi(pokemon);
  }
}

/*  const pokemonHTML = `
    <li class="pokemon ${pokemon.types[0].type.name} ">
        <ol class="types">
          ${pokemon.types
            .map(
              (type) => `<li class="type">
            <img src="./assets/img/icons/${type}.svg" alt="${type} icon type">
              </li>`
            )
            .join("")}
        </ol>
    `;*/

types.forEach((element) => {
  element.addEventListener("click", handleType);
});

async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

function pokemonToLi(pokemon) {
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
