import AbstractSmartComponent from "./abstract-smart";
import {BAR_HEIGHT} from "../utils/constant";

import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";

const createFilter = (filter, activeType) => {
  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter.type}" value="${filter.type}" ${filter.type === activeType ? `checked` : ``}>
    <label for="statistic-${filter.type}" class="statistic__filters-label">${filter.label}</label>`
  );
};

const createStatisticTemplate = (filmsLength, topGenre, allDurationInMin, grade, filterType) => {
  const duration = moment.duration(allDurationInMin, `minutes`);
  const hours = duration.hours();
  const minutes = duration.minutes();

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${grade}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${createFilter(PeriodStats.ALL_TIME, filterType)}
        ${createFilter(PeriodStats.TODAY, filterType)}
        ${createFilter(PeriodStats.WEEK, filterType)}
        ${createFilter(PeriodStats.MONTH, filterType)}
        ${createFilter(PeriodStats.YEAR, filterType)}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${filmsLength} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>`
  );
};

const renderChart = (labels, data) => {
  const statisticCtx = document.querySelector(`.statistic__chart`).getContext(`2d`);

  statisticCtx.height = BAR_HEIGHT * 5;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`,
        barThickness: 24,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

export default class Statistic extends AbstractSmartComponent {
  constructor(filmsLength, labels, data, allDurationInMin, grade) {
    super();

    this._filmsLength = filmsLength;

    this._labels = labels;
    this._data = data;

    this._topGenre = labels[0];
    this._allDurationInMin = allDurationInMin;
    this._grade = grade;
  }

  getTemplate() {
    return createStatisticTemplate(this._filmsLength, this._topGenre, this._allDurationInMin, this._grade);
  }

  show() {
    super.show();
    this._render();
  }

  _render() {
    renderChart(this._labels, this._data);
  }

  recoveryListeners() {
  }
}
