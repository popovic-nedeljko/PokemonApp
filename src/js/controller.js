import * as model from './model.js';
import pokemonView from './views/pokemonView.js';
import resultsSearchView from './views/resultsSearchView.js';
import searchView from './views/searchView.js';
import viewAllPokemons from './views/viewAllPokemons.js';
import paginationView from './views/paginationView.js';
import yourPokemonView from './views/yourPokemonView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
const controlPokemons = async function () {
  try {
    const id = +window.location.hash.slice(1);
    if (!id) return;

    //spinner
    pokemonView.renderSpinner();

    //loading pokemon
    await model.loadPokemon(id);

    //for using arrows (loading new page on pokelist)
    if (id % 10 === 1 || id % 10 === 0) {
      await model.loadAllPokemons(model.getApiForPage(model.state.page));
    }

    // for your pokemons(loading and rendering new page on pokelist )
    if (model.state.pokemon.catched_pokemon) {
      await model.loadAllPokemons(model.getApiForPage(model.state.page));
      viewAllPokemons.render(model.state.search.pokeListResults);
    }
    //click to rotate pokecard - for touchscreen mode
    pokemonView._TouchscreenClick();

    //update pokelist
    viewAllPokemons.update(model.state.search.pokeListResults);

    //update chached pokemon
    yourPokemonView.update(model.state.yourPokemons);

    //render pokemon
    pokemonView.render(model.state);

    //render pagination
    paginationView.render(model.state);
  } catch (err) {
    pokemonView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    // render spinner
    resultsSearchView.renderSpinner();

    //get search pokemon name
    const pokeName = searchView.getPokeName();
    if (!pokeName) return controlLoadAllPokemons();

    // load serch results
    await model.loadPokemon(pokeName);

    // render results
    resultsSearchView._generateMarkupPreview(model.state.pokemon);

    pokemonView.render(model.state);
    pokemonView._pokemonViewChangeToSearch();

    //render pagination
    paginationView._returnToList();
  } catch (err) {
    console.error(err);
    resultsSearchView.renderError();
    paginationView._returnToList();
  }
};

const controlLoadAllPokemons = async function () {
  try {
    // render spinner
    resultsSearchView.renderSpinner();

    // load  results
    await model.loadAllPokemons(model.getApiForPage(model.state.page));

    //render results
    viewAllPokemons.render(model.state.search.pokeListResults);

    //render initial pagination btn
    paginationView.render(model.state);
  } catch (err) {
    console.log(err);
    viewAllPokemons.renderError();
  }
};

const controlPagination = async function (goToPage) {
  try {
    //load new list
    await model.loadAllPokemons(model.getApiForPage(goToPage));

    //render new list results
    viewAllPokemons.render(model.state.search.pokeListResults);

    //render new pagination
    paginationView.render(model.state);
  } catch (err) {
    console.error('💥', err);
  }
};

const controlCatchPokemon = async function () {
  try {
    //add & remove pokemon
    if (!model.state.pokemon.catched_pokemon) {
      model.addYourPokemon(model.state.pokemon);

      //open catch-pokemon winndow
      yourPokemonView.toggleWindow();
      //close catch-pokemon window
      setTimeout(function () {
        yourPokemonView.toggleWindow();
      }, MODAL_CLOSE_SEC * 1000);
    } else model.removeYourPokemon(model.state.pokemon.id);

    //open modal window
    yourPokemonView.pokeText(model.state.pokemon);

    //update pokemon view
    yourPokemonView._cardAnimationChange();
    pokemonView.update(model.state);

    //render your pokemon list
    yourPokemonView.render(model.state.yourPokemons);
  } catch (err) {
    console.error('💥', err);
    yourPokemonView.renderError(err.message);
  }
};

const controlYourPokemon = function () {
  //render catched pokemon upon start of app
  yourPokemonView.render(model.state.yourPokemons);
};

//------------------initialization---------------------------------------

const init = function () {
  controlLoadAllPokemons();
  yourPokemonView.addHendlerRender(controlYourPokemon);

  pokemonView.addHandlerRender(controlPokemons);
  pokemonView.addHandlerKeyboardArrows();

  pokemonView.addHadnlerAddYourPokemon(controlCatchPokemon);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
