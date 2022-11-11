import View from './view.js';

class ViewAllPokemons extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `Something went wrong. Please load again!`;
  _message = ``;

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const id = +window.location.hash.slice(1);

    return `
    <li class="preview">
      <a class="preview__link ${
        result.id === id ? 'preview__link--active' : ''
      } " 
        href="#${result.id}"
      >
        <figure class="preview__fig">
          <img src="${result.picture}" alt="pict" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.name}</h4>
        </div>
      </a>
    </li>`;
  }
}
export default new ViewAllPokemons();
