import AirDatepicker from '../../libs/air-datepicker/air-datepicker';
import Chart from '../../libs/chart/chart';
import Header from '../../components/header/header';
import Comment from '../../components/comment/comment';
import '../../components/reserve-card/reserve-card';
import '../../templates/fonts.scss';
import './room-details.scss';

class RoomDetails {
  constructor() {
    this.header = new Header();
    this.comment = new Comment();

    this._initializeDateDropdown();
    this._initializeChart();
    this._addTextToChart();
    this._expandCanvas();
  }

  _initializeDateDropdown() {
    this.dateDropdown = new AirDatepicker('.js-date-dropdown');

    this.dateDropdown.initializePlugin({
      clearButton: true,
      keyboardNav: true,
      navTitles: { days: 'MM <i>yyyy</i>' },
      prevHtml: '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/></svg>',
      nextHtml: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 0.984375L17.0156 9L9 17.0156L7.59375 15.6094L13.1719 9.98438H0.984375V8.01562H13.1719L7.59375 2.39062L9 0.984375Z" fill="url(#paint0_linear)"/><defs><linearGradient id="paint0_linear" x1="9" y1="-13" x2="9" y2="31" gradientUnits="userSpaceOnUse"><stop stop-color="#BC9CFF"/><stop offset="1" stop-color="#8BA4F9"/></linearGradient></defs></svg>',
    });

    this.dateDropdown.setDatesDefault();
    this.dateDropdown.openDatepickerMultiple();
    this.dateDropdown.addApplyButton();
    this.dateDropdown.checkEmptyValue();
  }

  _initializeChart() {
    const $window = $(window);
    this.windowWidth = $window.width();

    this.canvas = document.querySelector('.js-room-details-chart').getContext('2d');

    const purple = this.canvas.createLinearGradient(0, 0, 0, 130);
    const green = this.canvas.createLinearGradient(0, 0, 0, 130);
    const orange = this.canvas.createLinearGradient(0, 10, 0, 130);
    const black = this.canvas.createLinearGradient(0, 110, 0, 130);

    purple.addColorStop(0, '#BC9CFF');
    purple.addColorStop(1, '#8BA4F9');

    green.addColorStop(0, '#6FCF97');
    green.addColorStop(1, '#66D2EA');

    orange.addColorStop(0, '#FFE39C');
    orange.addColorStop(0.5, '#FFBA9C');
    orange.addColorStop(1, '#FFBA9C');

    black.addColorStop(0, '#909090');
    black.addColorStop(1, '#3D4975');

    this.userRatings = [0, 65, 65, 130];

    const data = {
      labels: [
        'Разочарован',
        'Удовлетворительно',
        'Хорошо',
        'Великолепно',
      ],
      datasets: [{
        label: 'My First Dataset',
        data: this.userRatings,
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

    const options = {
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
            left: this.windowWidth < 600 ? -65 : -25,
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
    };

    const chart = new Chart(this.canvas, options);
  }

  _addTextToChart() {
    this.$canvasContainer = $('.js-room-details-doughnut-wrapper');
    this.$canvasContainer.append('<div class="room-details-chart-text-container"><span class="room-details-chart-text"><span class="room-details-chart-text__number js-room-details-chart-text__number">260</span> голосов</span></div>');
    this.$chartRatingSum = this.$canvasContainer.find('.js-room-details-chart-text__number');

    const getRatingSum = () => this.userRatings.reduce((a, b) => a + b, 0);

    this.$chartRatingSum.text(`${getRatingSum()}`);
  }

  _expandCanvas() {
    const $chart = $('.js-room-details-chart');

    const expandCanvas = () => {
      if (this.windowWidth < 400) $chart.width(280);
      else $chart.width(344);
    };

    expandCanvas();
  }
}

const roomDetails = new RoomDetails();
