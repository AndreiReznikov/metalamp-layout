import 'paginationjs/dist/pagination.min';
import 'paginationjs/dist/pagination.css';

class PaginationJS {
  constructor(pagination) {
    this._findElement(pagination);
  }

  initializePlugin(options) {
    this.$paginationContainer.pagination(options);
  }

  _findElement(pagination) {
    this.$pagination = $(pagination);
    this.$paginationContainer = this.$pagination.find('.js-pagination__container');
    this.$paginationDataContainer = this.$pagination.find('.js-pagination__data-container');
  }
}

export default PaginationJS;
