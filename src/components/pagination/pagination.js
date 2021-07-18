import 'paginationjs/dist/pagination.min.js'
import 'paginationjs/dist/pagination.css'

$(document).ready(function() {
  function simpleTemplating(data) {
    let html = '<ul class="pagination-list">';
    $.each(data, function(index, item){
        html += '<li class="pagination-list__item">'+ item +'</li>';
    });
    html += '</ul>';
    return html;
  };

    const paginationArray = [];

    for (let i = 0; i < 180; i++) {
      paginationArray.push(i);
    };
  
  $('.js-pagination-container').pagination({
    dataSource: paginationArray,
    autoHidePrevious: true,
    autoHideNext: true,
    pageRange: 1,
    showPageNumbers: true,
    showNavigator: false,
    prevText: '',
    nextText: '',
    pageSize: 12,
    callback: (data, pagination) => {
        let html = simpleTemplating(data);

        $('.js-data-container').html(html);
      }
    })
  });
