import View from './view.js';
import icons from '../../img/icons.svg';
import colorTypes from './colorTypes.js';
import { API_URL } from './../config.js';

class PokemonView extends View {
  _parentElement = document.querySelector('.pokemon');
  _errorMessage = `We could not find pokemon. Please try again!`;
  _message = ``;
  _colorForTypeAtr = document.querySelector('.card__pokemon-atribute--type');

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  //move through pokelist
  addHandlerNextPrevPokemon(handler) {
    //buttons left/right
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--next--prev');
      if (!btn) return;
      handler();
    });

    //keyboard arrow left
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        document.querySelector('.btn--prev').click();

        handler();
      }
    });

    //keyboard arrow right
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        document.querySelector('.btn--next').click();

        handler();
      }
    });
  }

  //for storing(chach) pokemon
  addHadnlerAddYourPokemon(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--catch_pokemon');
      if (!btn) return;
      handler();
    });
  }

  //click to rotate for touchscreens
  _TouchscreenClick() {
    if ('ontouchstart' in window || navigator.msMaxTouchPoints > 0) {
      this._parentElement.addEventListener('click', function (e) {
        e.preventDefault();
        const cardFront = e.target.closest('.card__side--front');
        const cardBack = e.target.closest('.card__side--back');

        if (cardFront) {
          document.querySelector('.card__side--front').style.transform =
            'rotateY(-180deg)';
          document.querySelector('.card__side--back').style.transform =
            'rotateY(0deg)';
        }
        if (cardBack) {
          document.querySelector('.card__side--front').style.transform =
            'rotateY(0deg)';
          document.querySelector('.card__side--back').style.transform =
            'rotateY(180deg)';
        }
      });
    } else return;
  }
  _generateMarkup() {
    let curPokemon = this._data.pokemon.id;

    return `
<div class="pokemon__info-buttons">
<button onclick="window.location='#${API_URL}${
      curPokemon - 1
    }/';"  data-goto="${curPokemon - 1}" class="btn--next--prev btn--prev">
    <svg>
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
  </button>
  <button onclick="window.location='#${API_URL}${
      curPokemon + 1
    }/';" data-goto="${curPokemon + 1}" class="btn--next--prev btn--next">
    <svg>
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>
</div>

<div class="card ">
  <div class="card__side card__side${
    this._data.pokemon.catched_pokemon === true ? '__catched-pokemon' : ''
  } card__side--front">
    <div class="card__picture">
      <img
        class="card__pokeImg"
        src="${this._data.pokemon.picture}"
        alt="img"
      />
    </div>
    <div class="card__click-instructions"></div>
    <div class="card__pokemon__name">
      <span class="card__pokemon__name-span">${this._data.pokemon.name}</span>
    </div>
  </div>

  <div class="card__side card__side${
    this._data.pokemon.catched_pokemon === true ? '__catched-pokemon--back' : ''
  } card__side--back">
    <div class="card__pokemon-details">
      <div class="card__pokeheader"></div>

      <div class="card__pokemon-details__picture--back">
          <figure class="card__pokemon-details-pic-back">
            <img class="card__pokemon-details-pic-back--img" src="${
              this._data.pokemon.picture
            }" alt="pict" />
          </figure>
      </div>

      <div class="card__pokemon-atributes">
        <li class="card__pokemon-atribute">
          <p class="card__pokemon-atribute card__pokemon-atribute--height">
            height:
            <span> ${(this._data.pokemon.height * 0.1).toFixed(2)}m</span>
          </p>
        </li>
        <li class="card__pokemon-atribute">
          <p class="card__pokemon-atribute card__pokemon-atribute--attack">
            attack: <span> ${this._data.pokemon.attack}</span>
          </p>
        </li>
        <li class="card__pokemon-atribute">
          <p class="card__pokemon-atribute card__pokemon-atribute--deffense">
            deffense: <span> ${this._data.pokemon.defense}</span>
          </p>
        </li>
        <li class="card__pokemon-atribute">
          <p class="card__pokemon-atribute card__pokemon-atribute--health">
            health: <span> ${this._data.pokemon.Hp}</span>
          </p>
        </li>
        <li class="card__pokemon-atribute">
          <p class="card__pokemon-atribute card__pokemon-atribute--speed">
            speed: <span> ${this._data.pokemon.speed}</span>
          </p>
        </li>

        <li class="card__pokemon-atribute">
          <div class="card__pokemon-atribute card__pokemon-atribute--types">
            type:   
            ${this._data.pokemon.type
              .map(type => {
                return `<p class="card__pokemon-atribute 
            card__pokemon-atribute--type" 
            style="background:${colorTypes[type]};">
              <span>${type}<span>            
            </p>`;
              })
              .join('')}
          </div>
        </li>
        <li class="card__pokemon-atribute">
          <p class="card__pokemon-atribute card__pokemon-atribute--abilities">
            abilities:<span>${this._data.pokemon.ability}</span>
          </p>
        </li>
      </div>
    </div>
  </div>
</div>

<button class="btn--ellipse btn--catch_pokemon btn--ellipse--animated">
  <p>catch pokemon</p>
  <svg class="">
    <use
      href="${icons}#icon-bookmark${
      this._data.pokemon.catched_pokemon ? '-fill' : ''
    }"
    ></use>
  </svg>
</button>

<div class="pokemon__your-pokemon-details">
  <div class="pokemon__info">
    <svg class="pokemon__info-icon">
      <use href="${icons}#icon-users"></use>
    </svg>
    <span class="pokemon__info-text">You have: </span>
    <span class="pokemon__info-data pokemon__info-data--pokemons"
      >${this._data.yourPokemons.length}</span
    >
    <span class="pokemon__info-text">pokemons</span>
  </div>
</div>
    `;
  }
}
export default new PokemonView();
