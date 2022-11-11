import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  pokemon: {},
  page: 1,
  resultsPerPage: RES_PER_PAGE,
  pageLinkApi: '',
  search: {
    pokeName: '',
    results: [],
    pokeListResults: [],
    allPokemon: [],
  },
  yourPokemons: [],
};

export const loadPokemon = async function (id) {
  try {
    //load pokemon data
    const data = await getJSON(`${API_URL}${id}`);

    let pokemon = data;
    //store pokemon data
    state.pokemon = {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      picture: pokemon.sprites.other['official-artwork'].front_default,
      pictureSub: pokemon.sprites.other.dream_world.front_default,
      Hp: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
      type: pokemon.types.map(item => item.type.name),
      ability: pokemon.abilities.map(ab => ab.ability.name).join(' ** '),
      url: `${API_URL}${pokemon.id}`,
    };

    if (state.yourPokemons.some(pokemon => pokemon.id === id))
      state.pokemon.catched_pokemon = true;
    else state.pokemon.catched_pokemon = false;

    //poge of the current pokemon
    state.page = Math.ceil(+state.pokemon.id / 10);
  } catch (err) {
    throw err;
  }
};

//------------SEARCH DATA-----------------------------------------------

export const loadSearchResults = async function (pokeName) {
  try {
    state.search.pokeName = pokeName;
    //load search data
    const data = await getJSON(`${API_URL}${pokeName}/`);

    let results = data;
    //store search data
    state.search.results = {
      id: results.id,
      name: results.name,
      picture: results.sprites.other['official-artwork'].front_default,
      pictureSub: results.sprites.other.dream_world.front_default,
      type: results.types.map(type => type.type.name).join(' '),
      url: `${API_URL}${results.id}/`,
    };

    //page of the searched pokemon
    state.page = Math.ceil(+state.search.results.id / 10);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getApiForPage = function (page = state.page) {
  state.page = page;
  const numResultForPage = (page - 1) * state.resultsPerPage;
  return (state.pageLinkApi = `https://pokeapi.co/api/v2/pokemon/?offset=${numResultForPage}&limit=10`);
};

//------------POKELIST DATA -----------------------------------------------
export const loadAllPokemons = async function (api) {
  try {
    //load pokelist data
    const data = await getJSON(api);
    const newPokeList = await Promise.all(
      data.results.map(item => fetchSinglePokemon(item.url))
    );
    //pokelist data stored
    return (state.search.pokeListResults = newPokeList.map(item => {
      return {
        id: item.id,
        name: item.name,
        picture: item.sprites.other['official-artwork'].front_default,
        pictureSub: item.sprites.other.dream_world.front_default,
        type: item.types.map(type => type.type.name).join(' '),
        url: `${API_URL}${item.id}/`,
      };
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const fetchSinglePokemon = async api => {
  const data = await getJSON(api);
  return data;
};

//------------LOCAL STORIGE -----------------------------------------------
const storeYourPokemon = function () {
  localStorage.setItem('pokemons', JSON.stringify(state.yourPokemons));
};

export const addYourPokemon = function (pokemon) {
  //add favoite pokemon
  state.yourPokemons.push(pokemon);

  //mark current pokemon as favorite
  if (pokemon.id === state.pokemon.id) state.pokemon.catched_pokemon = true;
  if (pokemon.id === state.pokemon.id)
    state.search.pokeListResults.find(
      pokemons => pokemons.id === pokemon.id
    ).catched_pokemon = true;

  storeYourPokemon();
};
// mark remove from your pokemons
export const removeYourPokemon = function (id) {
  const index = state.yourPokemons.findIndex(el => el.id === id);
  //remove with splice
  state.yourPokemons.splice(index, 1);
  if (id === state.pokemon.id) state.pokemon.catched_pokemon = false;

  storeYourPokemon();
};

const init = function () {
  const storage = localStorage.getItem('pokemons');
  if (storage) state.yourPokemons = JSON.parse(storage);
};
init();

// -------force clear local storage-------------------
// const clearYourPokemon = function () {
//   localStorage.clear('pokemons');
// };
// clearYourPokemon();
