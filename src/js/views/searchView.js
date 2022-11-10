class SearchView {
  _parentElement = document.querySelector('.search');

  getPokeName() {
    const pokename = this._parentElement
      .querySelector('.search__field')
      .value.toLowerCase();

    this._clearInput();

    return pokename;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  _previewAnimationChange() {
    document.querySelector('.preview__link').style.animation = 'none';
    document.querySelector('.preview__fig').style.animation =
      'flip 1s ease-in-out 0s backwards';
    document.querySelector('.preview__title').style.animation =
      'fadeIn 1s ease-in-out 0.2s backwards';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
