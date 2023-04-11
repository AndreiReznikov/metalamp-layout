const setSelectionGuestsText = (itemsCount, totalSum) => {
  let guests;
  let babies;

  const babiesNumber = itemsCount[2] ? itemsCount[2] : 0;

  const firstGuestWordCondition = (totalSum - babiesNumber)
    % 10 === 1 && (totalSum - babiesNumber) !== 11;
  const secondGuestWordCondition = [2, 3, 4].includes((totalSum - babiesNumber) % 10)
    && ![12, 13, 14].includes(totalSum - babiesNumber);

  if (totalSum === 0) return 'Сколько гостей';

  if (firstGuestWordCondition) guests = 'гость';
  else if (secondGuestWordCondition) guests = 'гостя';
  else guests = 'гостей';

  const firstBabyWordCondition = babiesNumber % 10 === 1 && babiesNumber !== 11;
  const secondBabyWordCondition = [2, 3, 4].includes(babiesNumber % 10)
    && ![12, 13, 14].includes(babiesNumber);

  if (firstBabyWordCondition) babies = 'младенец';
  else if (secondBabyWordCondition) babies = 'младенца';
  else babies = 'младенцев';

  const babiesOnly = babiesNumber !== 0 && (totalSum - babiesNumber) === 0;
  const babiesAndGuests = babiesNumber !== 0 && (totalSum - babiesNumber) !== 0;

  let selectionText = `${totalSum} ${guests}`;

  if (babiesOnly) selectionText = `${babiesNumber} ${babies}`;
  else if (babiesAndGuests) selectionText = `${totalSum - babiesNumber} ${guests}, ${babiesNumber} ${babies}`;

  return selectionText;
};

const setSelectionConveniencesText = (itemsCount, totalSum) => {
  let bedrooms;
  let beds;
  let bathrooms;

  const bedroomsNumber = itemsCount[0] ? itemsCount[0] : 0;
  const bedsNumber = itemsCount[1] ? itemsCount[1] : 0;
  const bathroomsNumber = itemsCount[2] ? itemsCount[2] : 0;

  const firstBedroomWordCondition = bedroomsNumber !== 0
    && bedroomsNumber % 10 === 1 && bedroomsNumber !== 11;
  const secondBedroomWordCondition = [2, 3, 4].includes(bedroomsNumber % 10)
    && ![12, 13, 14].includes(bedroomsNumber);

  if (totalSum === 0) return 'Выберите удобства';

  if (firstBedroomWordCondition) bedrooms = 'спальня';
  else if (secondBedroomWordCondition) bedrooms = 'спальни';
  else bedrooms = 'спален';

  const firstBedWordCondition = bedsNumber !== 0 && bedsNumber % 10 === 1 && bedsNumber !== 11;
  const secondBedWordCondition = [2, 3, 4].includes(bedsNumber % 10)
    && ![12, 13, 14].includes(bedsNumber);

  if (firstBedWordCondition) beds = 'кровать';
  else if (secondBedWordCondition) beds = 'кровати';
  else beds = 'кроватей';

  const firstBathroomWordCondition = bathroomsNumber !== 0
    && bathroomsNumber % 10 === 1 && bathroomsNumber !== 11;
  const secondBathroomWordCondition = [2, 3, 4].includes(bathroomsNumber % 10)
    && ![12, 13, 14].includes(bathroomsNumber);

  if (firstBathroomWordCondition) bathrooms = 'ванная комната';
  else if (secondBathroomWordCondition) bathrooms = 'ванные комнаты';
  else bathrooms = 'ванных комнат';

  const bedroomsOnly = bedroomsNumber !== 0
    && totalSum - bedroomsNumber === 0;
  const bedsOnly = bedsNumber !== 0 && totalSum - bedsNumber === 0;
  const bathroomsOnly = bathroomsNumber !== 0
    && totalSum - bathroomsNumber === 0;
  const bedroomsAndBeds = bedroomsNumber !== 0
    && bedsNumber !== 0 && totalSum - bedroomsNumber - bedsNumber === 0;
  const bedroomsAndBathrooms = bedroomsNumber !== 0
    && bathroomsNumber !== 0 && totalSum - bedroomsNumber - bathroomsNumber === 0;
  const bedsAndBathrooms = bedsNumber !== 0
    && bathroomsNumber !== 0 && totalSum - bedsNumber - bathroomsNumber === 0;
  const allConveniences = bedroomsNumber !== 0
    && bedsNumber !== 0 && bathroomsNumber !== 0;

  let selectionText = '';

  if (bedroomsOnly) selectionText = `${bedroomsNumber} ${bedrooms}...`;
  else if (bedsOnly) selectionText = `${bedsNumber} ${beds}...`;
  else if (bathroomsOnly) selectionText = `${bathroomsNumber} ${bathrooms}...`;
  else if (bedroomsAndBeds) selectionText = `${bedroomsNumber} ${bedrooms}, ${bedsNumber} ${beds}...`;
  else if (bedroomsAndBathrooms) selectionText = `${bedroomsNumber} ${bedrooms}, ${bathroomsNumber} ${bathrooms}...`;
  else if (bedsAndBathrooms) selectionText = `${bedsNumber} ${beds}, ${bathroomsNumber} ${bathrooms}...`;
  else if (allConveniences) selectionText = `${bedroomsNumber} ${bedrooms}, ${bedsNumber} ${beds}, ${bathroomsNumber} ван...`;

  return selectionText;
};

const prevArrow = '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/></svg>';
const nextArrow = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 0.984375L17.0156 9L9 17.0156L7.59375 15.6094L13.1719 9.98438H0.984375V8.01562H13.1719L7.59375 2.39062L9 0.984375Z" fill="url(#paint0_linear)"/><defs><linearGradient id="paint0_linear" x1="9" y1="-13" x2="9" y2="31" gradientUnits="userSpaceOnUse"><stop stop-color="#BC9CFF"/><stop offset="1" stop-color="#8BA4F9"/></linearGradient></defs></svg>';
const canvas = '<div class="room-details__chart-text-container"><span class="room-details__chart-text"><span class="room-details__chart-text-number js-room-details__chart-text-number">260</span> голосов</span></div>';

const vars = {
  setSelectionGuestsText,
  setSelectionConveniencesText,
  prevArrow,
  nextArrow,
  canvas,
};

export default vars;
