import 'paginationjs/dist/pagination.min';
import 'paginationjs/dist/pagination.css';

function simpleTemplating(data) {
  let html = '<ul class="pagination__list">';
  $.each(data, (index, item) => {
    html += `<li class="pagination__list-item">${item}</li>`;
  });
  html += '</ul>';
  return html;
}

const paginationArray = [];

for (let i = 0; i < 180; i += 1) {
  paginationArray.push(i);
}

$('.js-pagination__container').pagination({
  dataSource: paginationArray,
  autoHidePrevious: true,
  autoHideNext: true,
  pageRange: 1,
  showPageNumbers: true,
  showNavigator: false,
  prevText: '',
  nextText: '',
  pageSize: 12,
  callback: (data) => {
    const html = simpleTemplating(data);

    $('.js-pagination__data-container').html(html);
  },
});
