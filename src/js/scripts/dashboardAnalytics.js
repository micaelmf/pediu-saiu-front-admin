import ApexCharts from 'apexcharts'
import theme from '@/theme.json'

const fourSerialChart = {
  chart: {
    type: 'line',
    sparkline: {
      enabled: true,
    },
  },
  xaxis: {
    type: 'categories',
    categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
  },
  tooltip: {
    theme: 'dark',
    custom({ ctx, series, seriesIndex, dataPointIndex }) {
      return `<div class="text-sm py-2 px-3">${ctx.opts.xaxis.categories[dataPointIndex]}: <span class="font-bold">${series[seriesIndex][dataPointIndex]}</span></div>`
    },
  },
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  responsive: [{
    breakpoint: 1280,
    options: {
      chart: {
        type: 'area',
        height: 75,
      },
      fill: {
        opacity: 0.1,
      },
    },
  }],
}

totalVisitorChart()
newUserChart()
newVisitorChart()
subscriptionChart()
directTrafficChart()
activeUserChart()

function totalVisitorChart() {
  const options = {
    series: [{
      name: 'Visitor',
      data: [520, 745, 468, 976, 1683],
    }],
    colors: [theme.colors.info[400]],
    ...fourSerialChart,
  }

  const chart = new ApexCharts(document.getElementById('totalVisitorChart'), options)
  chart.render()
}

function newUserChart() {
  const options = {
    series: [{
      name: 'New User',
      data: [239, 745, 468, 976, 782],
    }],
    colors: [theme.colors.indigo[400]],
    ...fourSerialChart,
  }

  const chart = new ApexCharts(document.getElementById('newUserChart'), options)
  chart.render()
}

function newVisitorChart() {
  const options = {
    series: [{
      name: 'New Visitor',
      data: [151, 145, 303, 259, 229],
    }],
    colors: [theme.colors.blue[400]],
    ...fourSerialChart,
  }

  const chart = new ApexCharts(document.getElementById('newVisitorChart'), options)
  chart.render()
}

function subscriptionChart() {
  const options = {
    series: [{
      name: 'Subscription',
      data: [1298, 1572, 2572, 2172, 3172],
    }],
    colors: [theme.colors.green[400]],
    ...fourSerialChart,
  }

  const chart = new ApexCharts(document.getElementById('subscriptionChart'), options)
  chart.render()
}

function directTrafficChart() {
  const options = {
    series: [{
      name: 'Earning',
      data: [291, 249, 187, 220, 98, 242, 296],
    }],
    colors: [theme.colors.primary[400]],
    chart: {
      type: 'area',
      height: '100%',
      toolbar: {
        show: false,
      },
      fontFamily: 'Quicksand',
    },
    fill: {
      gradient: {
        shadeIntensity: 0.99,
      },
    },
    xaxis: {
      type: 'categories',
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: {
        show: false,
      },
      labels: {
        datetimeFormatter: {
          month: 'MMM',
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: theme.colors.gray[200],
      strokeDashArray: 3,
      padding: {
        left: 20,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'MMM'
      },
      style: {
        fontSize: '0.875rem',
        fontFamily: 'Quicksand',
      },
    },
    responsive: [{
      breakpoint: 1500,
      options: {
        plotOptions: {
          bar: {
            borderRadius: [3, 3],
          },
        },
      },
    }, {
      breakpoint: 768,
      options: {
        chart: {
          height: 200,
        },
      },
    }],
    stroke: {
      width: 3,
      curve: 'smooth',
    },
  }

  const chart = new ApexCharts(document.getElementById('directTrafficChart'), options)
  chart.render()
}

function activeUserChart() {
  var options = {
    series: [750, 375, 371, 190],
    labels: ['Desktop', 'Tablet', 'Mobile', 'Unknown'],
    colors: [
      theme.colors.indigo[400],
      theme.colors.green[400],
      theme.colors.orange[300],
      theme.colors.gray[300],
    ],
    chart: {
      type: 'donut',
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        customScale: 1,
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: {
              fontFamily: 'Quicksand',
              fontSize: '0.875rem',
            },
            value: {
              fontFamily: 'Quicksand',
              fontSize: '1.25rem',
              offsetY: 0,
              fontWeight: 700,
            },
          },
        },
      },
    },
  };

  var chart = new ApexCharts(document.getElementById('activeUserChart'), options);
  chart.render();
}
