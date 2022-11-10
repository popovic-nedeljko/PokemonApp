import View from './view.js';
import icons from '../../img/icons.svg';
import { firstPage, lastPage } from '../config.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      // console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    let curPage = this._data.page;

    // page 1 and there are other pages
    if (curPage === firstPage) {
      return `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>`;
    }
    //other page
    if (curPage > 1) {
      return `
     <button data-goto="${
       curPage - 1
     }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
        <span>Page ${curPage - 1}</span>
     </button>
     <button data-goto="${
       curPage + 1
     }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
     </button>`;
    }
    //last page
    if (curPage === lastPage) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
             <svg class="search__icon">
                 <use href="${icons}#icon-arrow-left"></use>
             </svg>
         <span>Page ${curPage - 1}</span>
      </button>`;
    }
  }
}
export default new PaginationView();
