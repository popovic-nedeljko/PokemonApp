import View from './view.js';

class YourPokemonView extends View {
  _parentElement = document.querySelector('.yourPokemon__list');
  _errorMessage = `No pokemon jet. Find a nice pokemon and catch it`;
  _message = `You have successfully caught this pokemon🏆✔✔✔ :)`;

  _btnOpen = document.querySelector('.btn--ellipse');
  _window = document.querySelector('.add-pokemon-window');
  _overlay = document.querySelector('.overlay');

  addHendlerRender(handler) {
    window.addEventListener('load', handler);
  }

  //model window open/close
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
      <a class="preview__link ${
        result.url === id ? 'preview__link--active' : ''
      }"
        href="#${result.url}"
      >
        <figure class="preview__fig">
          <img src="${result.picture}" alt="pict" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title preview__title--your-pokemon">${
            result.name
          }</h4>
        </div>
      </a>
    </li>`;
  }
}
export default new YourPokemonView();
