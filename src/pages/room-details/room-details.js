import AirDatepicker from '../../libs/air-datepicker/air-datepicker';
import Chart from '../../libs/chart/chart';
import Header from '../../components/header/header';
import Dropdown from '../../components/dropdown/dropdown';
import LikeButton from '../../components/like-button/like-button';
import vars from '../../templates/vars';
import '../../templates/fonts.scss';
import './room-details.scss';

class RoomDetails {
  initializeComponents() {
    this.header = new Header();
    this.likeButton = new LikeButton();
    this.dropdownGuests = new Dropdown(
      '.js-dropdown__wrapper_guests',
      vars.setSelectionGuestsText,
      'Сколько гостей',
    );
  }

  initializePlugins() {
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
      prevHtml: vars.prevArrow,
      nextHtml: vars.nextArrow,
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

    return chart;
  }

  _addTextToChart() {
    this.$canvasContainer = $('.js-room-details-doughnut-wrapper');
    this.$canvasContainer.append(vars.canvas);
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

roomDetails.initializeComponents();
roomDetails.initializePlugins();
