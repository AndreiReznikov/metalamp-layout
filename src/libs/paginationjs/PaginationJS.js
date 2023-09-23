import 'paginationjs/dist/pagination.min';
import 'paginationjs/dist/pagination.css';

class PaginationJS {
  constructor(pagination) {
    this._findElement(pagination);
  }

  initializePlugin(options) {
    const {
      dataSource,
      autoHidePrevious,
      autoHideNext,
      pageRange,
      showPageNumbers,
      showNavigator,
      formatNavigator,
      prevText,
      nextText,
      pageSize,
      callback,
      afterPaging,
    } = options;

    this.$paginationContainer.pagination({
      dataSource,
      autoHidePrevious,
      autoHideNext,
      pageRange,
      showPageNumbers,
      showNavigator,
      formatNavigator,
      prevText,
      nextText,
      pageSize,
      callback: (data) => {
        const html = this.templatePaginationItems(data, callback);

        this.$paginationDataContainer.html(html);
      },
      afterPaging,
      afterNextOnClick: () => this.showItemsNumber(pageSize),
      afterPreviousOnClick: () => this.showItemsNumber(pageSize),
      afterPageOnClick: () => this.showItemsNumber(pageSize),
    });
  }

  showDataContainer() {
    this.$paginationDataContainer.addClass(
      'pagination__data-container_visible',
    );
  }

  showItemsNumber(pageSize) {
    this.pageSize = pageSize;
    this.paginationItemsNumber = $('.js-pagination__list-item').length;
    this.paginationSubText = this.$pagination.find('.js-pagination__numbers');
    this.pageNumber = this.$paginationContainer.pagination('getSelectedPageNum');

    const paginationText = `${
      this.pageSize * this.pageNumber - this.pageSize + 1
    } -
          ${
  this.pageSize * this.pageNumber
            - (this.pageSize - this.paginationItemsNumber)
} `;

    this.paginationSubText.text(paginationText);
  }

  templatePaginationItems(data, callback) {
    this.html = '<ul class="pagination__list">';
    $.each(data, (_, item) => {
      this.html += callback(item);
    });
    this.html += '</ul>';
    return this.html;
  }

  _findElement(pagination) {
    this.$pagination = $(pagination);
    this.$paginationContainer = this.$pagination.find(
      '.js-pagination__container',
    );
    this.$paginationDataContainer = this.$pagination.find(
      '.js-pagination__data-container',
    );
  }
}

export default PaginationJS;
