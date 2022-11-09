class SearchView {
  _parentElement = document.querySelector('.search');

  getPokeName() {
    const pokename = this._parentElement.querySelector('.search__field').value;
    this._clearInput();

    return pokename;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
