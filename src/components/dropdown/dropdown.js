import './item-quantity-dropdown/src/index'
import './item-quantity-dropdown/lib/item-quantity-dropdown.min.css'

$(document).ready(function() {
  $(".js-iqdropdown-guests").iqDropdown({
    setSelectionText(itemCount, totalItems) {
      let guests;
      let babies;
      
      const babiesNumber = itemCount[3];

      const firstGuestWordCondition = (totalItems - babiesNumber) % 10 == 1 && (totalItems - babiesNumber) !== 11;
      const secondGuestWordCondition = [2, 3, 4].includes((totalItems - babiesNumber) % 10) && ![12, 13, 14].includes(totalItems - babiesNumber);

      if (totalItems == 0) return 'Сколько гостей';

      if (firstGuestWordCondition) guests = 'гость';
      else if (secondGuestWordCondition) guests = 'гостя';
      else guests = 'гостей';

      const firstBabyWordCondition = babiesNumber % 10 == 1 && babiesNumber !== 11;
      const secondBabyWordCondition = [2, 3, 4].includes(babiesNumber % 10) && ![12, 13, 14].includes(babiesNumber);

      if (firstBabyWordCondition) babies = 'младенец';
      else if (secondBabyWordCondition) babies = 'младенца';
      else babies = 'младенцев';

      const firstGuestsStringCondition = babiesNumber !== 0 && (totalItems - babiesNumber) == 0;
      const secondGuestsStringCondition = babiesNumber !== 0 && (totalItems - babiesNumber) !== 0;

      if (firstGuestsStringCondition) {
        return babiesNumber + ' ' + babies;
      }
      else if (secondGuestsStringCondition) {
        return totalItems - babiesNumber + ' ' + guests + ', ' + babiesNumber + ' ' + babies;
      }
      return totalItems + ' ' + guests;
    },
    });

    $(".js-iqdropdown-conveniences").iqDropdown({
      setSelectionText(itemCount, totalItems) {
        let bedrooms;
        let beds;
        let bathrooms;

        const bedroomsNumber = itemCount[1];
        const bedsNumber = itemCount[2];
        const bathroomsNumber = itemCount[3];

        const firstBedroomWordCondition = bedroomsNumber !== 0 && bedroomsNumber % 10 == 1 && bedroomsNumber !== 11;
        const secondBedroomWordCondition = [2, 3, 4].includes(bedroomsNumber % 10) && ![12, 13, 14].includes(bedroomsNumber);

        if (totalItems == 0) return 'Выберите удобства';

        if (firstBedroomWordCondition) bedrooms = 'спальня';
        else if (secondBedroomWordCondition) bedrooms = 'спальни';
        else bedrooms = 'спален';

        const firstBedWordCondition = bedsNumber !== 0 && bedsNumber % 10 == 1 && bedsNumber !== 11;
        const secondBedWordCondition = [2, 3, 4].includes(bedsNumber % 10) && ![12, 13, 14].includes(bedsNumber);

        if (firstBedWordCondition) beds = 'кровать';
        else if (secondBedWordCondition) beds = 'кровати';
        else beds = 'кроватей';

        const firstBathroomWordCondition = bathroomsNumber !== 0 && bathroomsNumber % 10 == 1 && bathroomsNumber !== 11;
        const secondBathroomWordCondition = [2, 3, 4].includes(bathroomsNumber % 10) && ![12, 13, 14].includes(bathroomsNumber);

        if (firstBathroomWordCondition) bathrooms = 'ванная комната';
        else if (secondBathroomWordCondition) bathrooms = 'ванные комнаты';
        else bathrooms = 'ванных комнат';

        const firstConveniencesStringCondition = bedroomsNumber !== 0 && totalItems - bedroomsNumber == 0;
        const secondConveniencesStringCondition = bedsNumber !== 0 && totalItems - bedsNumber == 0;
        const thirdConveniencesStringCondition = bathroomsNumber !== 0 && totalItems - bathroomsNumber == 0;
        const fourthConveniencesStringCondition = bedroomsNumber !== 0 && bedsNumber !== 0 && totalItems - bedroomsNumber - bedsNumber == 0;
        const sixthConveniencesStringCondition = bedroomsNumber !== 0 && bathroomsNumber !== 0 && totalItems - bedroomsNumber - bathroomsNumber == 0;
        const seventhConveniencesStringCondition = bedsNumber !== 0 && bathroomsNumber !== 0 && totalItems - bedsNumber - bathroomsNumber == 0;
        const eighthConveniencesStringCondition = bedroomsNumber !== 0 && bedsNumber !== 0 && bathroomsNumber !== 0;

        if (firstConveniencesStringCondition) return bedroomsNumber + ' ' + bedrooms + '...';
        else if (secondConveniencesStringCondition) return bedsNumber + ' ' + beds + '...';
        else if (thirdConveniencesStringCondition) return bathroomsNumber + ' ' + bathrooms + '...';
        else if (fourthConveniencesStringCondition) return bedroomsNumber + ' ' + bedrooms + ', ' + bedsNumber + ' ' + beds + '...';
        else if (sixthConveniencesStringCondition) return bedroomsNumber + ' ' + bedrooms + ', ' + bathroomsNumber + ' ' + bathrooms + '...';
        else if (seventhConveniencesStringCondition) return bedsNumber + ' ' + beds + ', ' + bathroomsNumber + ' ' + bathrooms + '...';
        else if (eighthConveniencesStringCondition) return bedroomsNumber + ' ' + bedrooms + ', ' + bedsNumber + ' ' + beds + ', ' + bathroomsNumber + ' ван...';
      }
      });
      
      function clickDropdownButtons() {
        const $dropdownsCollection = $('.js-iqdropdown-container'); 

        $dropdownsCollection.each(function() {
          const $dropdown = $(this);
          const incrementButtons = $dropdown.find('.js-button-increment');

          const buttonsNums = eval($dropdown.data('buttons'));
          const clicksNums = eval($dropdown.data('clicks'));

          if(buttonsNums && clicksNums) {
            for (let i = 0; i < buttonsNums.length; i++) {
              const $incrementButton = $(incrementButtons[buttonsNums[i]]);
  
              for (let j = 0; j < clicksNums[i]; j++) {
                $incrementButton.trigger('click');
              }
            }
          }
        });
      };

      clickDropdownButtons();
});