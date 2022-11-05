import Chart from 'chart.js/auto';

import '../../components/header/header';
import '../../components/reserve-card/reserve-card';
import '../../components/comment/comment';
import '../../templates/fonts.scss';
import './room-details.scss';

const canvasContainer = document.querySelector('.js-room-details-doughnut-wrapper');

$(canvasContainer).append('<div class="room-details-chart-text-container"><span class="room-details-chart-text"><span class="room-details-chart-text__number js-room-details-chart-text__number">260</span> голосов</span></div>');

const windowWidth = $(window).width();

const canvas = document.querySelector('.js-room-details-chart').getContext('2d');

const purple = canvas.createLinearGradient(0, 0, 0, 130);
const green = canvas.createLinearGradient(0, 0, 0, 130);
const orange = canvas.createLinearGradient(0, 10, 0, 130);
const black = canvas.createLinearGradient(0, 110, 0, 130);

purple.addColorStop(0, '#BC9CFF');
purple.addColorStop(1, '#8BA4F9');

green.addColorStop(0, '#6FCF97');
green.addColorStop(1, '#66D2EA');

orange.addColorStop(0, '#FFE39C');
orange.addColorStop(0.5, '#FFBA9C');
orange.addColorStop(1, '#FFBA9C');

black.addColorStop(0, '#909090');
black.addColorStop(1, '#3D4975');

const dataArray = [0, 65, 65, 130];

const data = {
  labels: [
    'Разочарован',
    'Удовлетворительно',
    'Хорошо',
    'Великолепно',
  ],
  datasets: [{
    label: 'My First Dataset',
    data: dataArray,
    backgroundColor: [
      black,
      purple,
      green,
      orange,
    ],
    hoverOffset: 4,
    borderWidth: 1,
  }],
};

const myChart = new Chart(canvas, {
  type: 'doughnut',
  data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    radius: '94%',
    cutout: '91%',
    color: 'rgba(31, 32, 65, 0.75)',
    layout: {
      padding: {
        left: windowWidth < 600 ? -65 : -25,
      },
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
      },
    },
  },
});

const ctx = document.querySelector('.js-room-details-chart');

const responsiveCanvas = () => {
  if (windowWidth < 400) $(ctx).width(280);
  else $(ctx).width(344);
};

responsiveCanvas();

const chartVoicesSum = $('.js-room-details-chart-text__number');

const getVoicesSum = () => dataArray.reduce((a, b) => a + b, 0);

chartVoicesSum.text(`${getVoicesSum()}`);

const $forms = $('form');

const handleFormsPreventDefault = (event) => {
  event.preventDefault();
};

$forms.submit(handleFormsPreventDefault);
