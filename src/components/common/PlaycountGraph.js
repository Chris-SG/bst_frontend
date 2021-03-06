import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { compareUTCDate } from '../../helpers/time';

const useStyles = makeStyles((theme) => ({
  chart: {
    textAlign: 'center',
    display: 'inline',
    float: 'none',
    margin: 'auto',
  },
}));

export const PlaycountGraph = ({ data, startingDate, endingDate }) => {
  const classes = useStyles();
  const chartWidth = '380px';
  const chartType = 'bar';
  const chartSeries = [
    {
      name: 'Playcount',
      data: [],
    },
  ];
  const chartOptions = {
    chart: {
      id: 'playcount',
      toolbar: {
        tools: {
          download: false,
        },
      },
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          colors: [],
        },
      },
    },
    yaxis: {
      min: 0,
      labels: {
        style: {
          colors: ['#CCCCCC'],
        },
      },
    },
    dataLabels: {
      style: {
        colors: ['#CCCCCC'],
      },
    },
  };

  const playCounts = new Map();
  const startingDateArr = startingDate.split('-');
  const endingDateArr = endingDate.split('-');
  let date = new Date(startingDateArr[0], startingDateArr[1] - 1, startingDateArr[2]);
  const targetDate = new Date(endingDateArr[0], endingDateArr[1] - 1, endingDateArr[2]);

  do {
    date.setUTCDate(date.getUTCDate() + 1);
    const dateString = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
    playCounts[dateString] = 0;
    chartOptions.xaxis.categories.push(dateString);
  } while (compareUTCDate(date, targetDate) <= 0);

  data.forEach((wd) => {
    if (playCounts[wd.Date] !== undefined) {
      playCounts[wd.Date] = wd.Playcount;
    }
  });

  date = new Date(startingDateArr[0], startingDateArr[1] - 1, startingDateArr[2]);
  do {
    date.setUTCDate(date.getUTCDate() + 1);
    const dateString = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
    chartSeries[0].data.push(playCounts[dateString]);
  } while (compareUTCDate(date, targetDate) <= 0);

  return (
    <>
      <Chart
        className={classes.chart}
        options={chartOptions}
        series={chartSeries}
        type={chartType}
        width={chartWidth}
      />
    </>
  );
};

PlaycountGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  startingDate: PropTypes.string.isRequired,
  endingDate: PropTypes.string.isRequired,
};

export const PlaycountGraphMemo = React.memo(PlaycountGraph);
