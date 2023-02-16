import ChartJS from 'chart.js/auto';

class Chart {
  constructor(canvas, options) {
    this._initializePlugin(canvas, options);
  }

  _initializePlugin(canvas, options) {
    this.chart = new ChartJS(canvas, options);
  }
}

export default Chart;
