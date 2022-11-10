import MaskedTextField from '../../libs/inputmask/inputmask';
import IonRangeslider from '../../libs/ion-rangeslider/ion-rangeslider';
import '../../components/dropdown/dropdown';
import '../../components/date-dropdown/date-dropdown';
import '../../components/filter-date-dropdown/filter-date-dropdown';
import ExpandableCheckboxList from '../../components/expandable-checkbox-list/expandable-checkbox-list';
import LikeButton from '../../components/like-button/like-button';
import '../../components/pagination/pagination';
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
