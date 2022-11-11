import MaskedTextField from '../../libs/inputmask/inputmask';
import IonRangeslider from '../../libs/ion-rangeslider/ion-rangeslider';
import '../../components/dropdown/dropdown';
import '../../components/date-dropdown/date-dropdown';
import '../../components/filter-date-dropdown/filter-date-dropdown';
import ExpandableCheckboxList from '../../components/expandable-checkbox-list/expandable-checkbox-list';
import LikeButton from '../../components/like-button/like-button';
import PaginationJS from '../../libs/paginationjs/paginationjs';
import '../../templates/fonts.scss';
import './form-elements.scss';

const expandableCheckboxList = new ExpandableCheckboxList();
const likeButton = new LikeButton();

const maskedTextField = new MaskedTextField('.js-masked-text-field__input');

maskedTextField.initializePlugin({
  placeholder: 'ДД.ММ.ГГГГ',
  alias: 'datetime',
  inputFormat: 'dd.mm.yyyy',
});

const ionRangeSlider = new IonRangeslider('.js-range-slider');

ionRangeSlider.initializePlugin({
  skin: 'flat',
  min: 600,
  max: 15250,
  from: 5000,
  to: 10000,
  type: 'double',
});

ionRangeSlider.addTooltips();
ionRangeSlider.setTooltipsValues();

const addPaginationItem = (item) => {
  const paginationItem = `<li class="pagination__list-item">${item}</li>`;

  return paginationItem;
};

const paginationItems = [];
for (let i = 0; i < 180; i += 1) {
  paginationItems.push(i);
}

const pagination = new PaginationJS('.js-pagination');

pagination.initializePlugin({
  dataSource: paginationItems,
  autoHidePrevious: true,
  autoHideNext: true,
  pageRange: 1,
  showPageNumbers: true,
  showNavigator: false,
  prevText: '',
  nextText: '',
  pageSize: 12,
  callback: addPaginationItem,
});
