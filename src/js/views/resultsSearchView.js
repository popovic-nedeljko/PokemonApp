import View from './view.js';

class ResultsSearchView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No pokemon found. Insert correct name of the pokemon!`;
  _message = ``;

  _generateMarkupPreview(result) {
    if (!result || (Array.isArray(result) && result.length === 0))
      return this.renderError();

    const markup = `
    <li class="preview">
      <a class="preview__link preview__link" href="#${result.url}">
        <figure class="preview__fig">
          <img src="${result.picture}" alt="pict" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.name}</h4>
       </div>
      </a>
    </li>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
export default new ResultsSearchView();
