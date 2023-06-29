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

const canvasOptions = {
  type: 'doughnut',
  data: {},
  options: {
    responsive: true,
    maintainAspectRatio: false,
    radius: '94%',
    cutout: '91%',
    color: 'rgba(31, 32, 65, 0.75)',
    layout: {
      padding: {},
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        position: 'right',
        align: 'end',
        reverse: true,
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            family: 'Montserrat, Arial, sans-serif',
            size: 14,
            style: 'normal',
          },
        },
        onHover: () => false,
        onLeave: () => false,
      },
    },
  },
};

const prevArrow = '<div class="datepicker--arrow-prev"></div>';
const nextArrow = '<div class="datepicker--arrow-next"></div>';
const canvas = '<div class="room-details__chart-text-container"><span class="room-details__chart-text js-room-details__chart-text"><span class="room-details__chart-text-number js-room-details__chart-text-number"></span> голосов</span></div>';

const vars = {
  setSelectionGuestsText,
  setSelectionConveniencesText,
  prevArrow,
  nextArrow,
  canvas,
  canvasOptions,
};

export default vars;
