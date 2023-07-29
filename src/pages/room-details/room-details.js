import AirDatepicker from '~libs/air-datepicker';
import Chart from '~libs/chart';
import consts from '~constants/consts';
import '~components/header';
import '~components/dropdown';
import '~components/like-button';
import '~templates/fonts.scss';

import './room-details.scss';

class RoomDetails {
  initializePlugins() {
    this._initializeDateDropdown();
    this._initializeChart();
    this._addRatingSumToChart();
    this._changeValueWidth();
    this._expandCanvas();
  }

  _initializeDateDropdown() {
    this.dateDropdown = new AirDatepicker('.js-date-dropdown');

    this.dateDropdown.initializePlugin({
      clearButton: true,
      keyboardNav: true,
      navTitles: { days: 'MM <i>yyyy</i>' },
      prevHtml: consts.prevArrow,
      nextHtml: consts.nextArrow,
    });

    this.dateDropdown.setDatesDefault();
    this.dateDropdown.openDatepickerMultiple();
    this.dateDropdown.addApplyButton();
    this.dateDropdown.checkEmptyValue();
  }

  _initializeChart() {
    const $window = $(window);
    this.windowWidth = $window.width();

    this.canvas = document.querySelector('.js-room-details__chart').getContext('2d');
    this.$canvasContainer = $('.js-room-details__doughnut-wrapper');
    this.$canvasContainer.append(consts.canvas);
    this.$chart = $('.js-room-details__chart');
    this.$chartRating = this.$canvasContainer.find('.js-room-details__chart-text-number');
    this.$chartText = this.$canvasContainer.find('.js-room-details__chart-text-items');

    this.colors = {
      black: ['#909090', '#3D4975'],
      purple: ['#BC9CFF', '#8BA4F9'],
      green: ['#6FCF97', '#66D2EA'],
      orange: ['#FFE39C', '#FFBA9C'],
      default: '#1F2041',
    };

    const canvasPurple = this.canvas.createLinearGradient(0, 0, 0, 130);
    const canvasGreen = this.canvas.createLinearGradient(0, 0, 0, 130);
    const canvasOrange = this.canvas.createLinearGradient(0, 10, 0, 130);
    const canvasBlack = this.canvas.createLinearGradient(0, 110, 0, 130);

    const setCanvasColor = (options) => {
      const [canvasColor, firstColorStop, secondColorStop] = options;

      canvasColor.addColorStop(0, firstColorStop);
      canvasColor.addColorStop(1, secondColorStop);
    };

    setCanvasColor([canvasPurple, ...this.colors.purple]);
    setCanvasColor([canvasGreen, ...this.colors.green]);
    setCanvasColor([canvasOrange, ...this.colors.orange]);
    setCanvasColor([canvasBlack, ...this.colors.black]);

    this.userRatings = [0, 260, 260, 520];
    this.labels = [
      'Разочарован',
      'Удовлетворительно',
      'Хорошо',
      'Великолепно',
    ];

    this.canvasData = {
      labels: this.labels,
      datasets: [{
        label: 'Ratings',
        data: this.userRatings,
        backgroundColor: [
          canvasBlack,
          canvasPurple,
          canvasGreen,
          canvasOrange,
        ],
        hoverOffset: 4,
        borderWidth: 1,
      }],
    };

    this.canvasOptions = consts.canvasOptions;
    this.canvasOptions.data = this.canvasData;
    this.canvasOptions.options.layout.padding = {
      left: this.windowWidth < 600 ? -65 : -25,
    };
    this.canvasOptions.options.plugins.legend.onHover = (event, legendItem, legend) => {
      this._callLegendCallback(event, legendItem, legend, 'hover');
      this._changeValueWidth();
    };
    this.canvasOptions.options.plugins.legend.onLeave = (event, legendItem, legend) => {
      this._callLegendCallback(event, legendItem, legend, 'leave');
      this._changeValueWidth();
    };

    const doughnutChart = new Chart(this.canvas, this.canvasOptions);

    this.doughnutChart = doughnutChart;
  }

  _callLegendCallback(event, legendItem, _, eventType) {
    const $legendItem = $(event.native.target);

    $legendItem.css('cursor', eventType === 'hover' ? 'pointer' : 'default');
    this._changeChartText(legendItem.index, eventType !== 'hover');
  }

  _addRatingSumToChart() {
    const getRatingSum = () => this.userRatings.reduce((a, b) => a + b, 0);

    this.$chartRating.val(`${getRatingSum()}`);
  }

  _changeValueWidth() {
    this.$chartRating.css('width', `${this.$chartRating.val().length * 20}px`);
    this.$chartText.css('width', `${this.$chartText.val().length * 10}px`);
  }

  _changeChartText(index, isOnLeaveEvent) {
    const currentRating = this.userRatings[index];
    const colorsProperty = Object.keys(this.colors)[index];
    const currentColor = this.colors[colorsProperty][0];

    this.$chartRating.val(`${currentRating}`);
    this.$chartRating.css('color', currentColor);
    this.$chartText.css('color', currentColor);

    this.userRatings.forEach((_, i) => {
      if (i === index) return;

      this.doughnutChart.chart.toggleDataVisibility(i);
      this.doughnutChart.chart.update();
    });

    if (!isOnLeaveEvent) return;

    this.$chartRating.css('color', this.colors.default);
    this.$chartText.css('color', this.colors.default);
    this._addRatingSumToChart();
  }

  _expandCanvas() {
    const expandCanvas = () => {
      if (this.windowWidth < 577) this.$chart.width(280);
      else this.$chart.width(344);
    };

    expandCanvas();
  }
}

const roomDetails = new RoomDetails();

roomDetails.initializePlugins();
