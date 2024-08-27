import ApexCharts from "apexcharts";
import theme from "@/theme.json";

revenueChart();
revenueSumChart();
salesByCategoryChart();

function revenueChart() {
  const options = {
    series: [
      {
        name: "Earning",
        data: [291, 249, 187, 220, 98, 82, 106, 143, 212, 296, 276, 343],
      },
      {
        name: "Expenses",
        data: [
          -59, -194, -54, -22, -56, -117, -125, -76, -153, -187, -156, -128,
        ],
      },
    ],
    colors: [theme.colors.primary[500], theme.colors.info[300]],
    chart: {
      type: "bar",
      height: 250,
      stacked: true,
      toolbar: {
        show: false,
      },
      fontFamily: "Quicksand",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2021-01",
        "2021-02",
        "2021-03",
        "2021-04",
        "2021-05",
        "2021-06",
        "2021-07",
        "2021-08",
        "2021-09",
        "2021-10",
        "2021-11",
        "2021-12",
      ],
      axisBorder: {
        show: false,
      },
      labels: {
        datetimeFormatter: {
          month: "MMM",
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: theme.colors.gray[200],
      strokeDashArray: 3,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "20%",
        borderRadius: 5,
        borderRadiusWhenStacked: "all",
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "MMM",
      },
      style: {
        fontSize: "0.875rem",
        fontFamily: "Quicksand",
      },
    },
    responsive: [
      {
        breakpoint: 1500,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 3,
            },
          },
        },
      },
    ],
  };

  const chart = new ApexCharts(
    document.getElementById("revenueChart"),
    options,
  );
  chart.render();
}

function revenueSumChart() {
  const options = {
    series: [
      {
        name: "Revenue",
        data: [745, 468, 976, 1176],
      },
    ],
    colors: [theme.colors.primary[400]],
    chart: {
      height: 100,
      type: "line",
      sparkline: {
        enabled: true,
      },
    },
    xaxis: {
      type: "categories",
      categories: ["2019", "2020", "2021", "2022"],
    },
    tooltip: {
      theme: "dark",
      custom({ ctx, series, seriesIndex, dataPointIndex }) {
        return `<div class="text-sm py-2 px-3">${ctx.opts.xaxis.categories[dataPointIndex]}: <span class="font-bold">${series[seriesIndex][dataPointIndex]}</span></div>`;
      },
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
  };

  const chart = new ApexCharts(
    document.getElementById("revenueSumChart"),
    options,
  );
  chart.render();
}

function salesByCategoryChart() {
  var options = {
    series: [25, 43, 15, 17],
    labels: ["Electronics", "Women's", "Phones", "Others"],
    colors: [
      theme.colors.indigo[400],
      theme.colors.green[400],
      theme.colors.yellow[300],
      theme.colors.red[400],
    ],
    chart: {
      type: "donut",
      width: "100%",
      height: "100%",
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
          size: "75%",
          labels: {
            show: true,
            name: {
              fontFamily: "Quicksand",
              fontSize: "0.875rem",
            },
            value: {
              fontFamily: "Quicksand",
              fontSize: "1.25rem",
              offsetY: 0,
              fontWeight: 700,
            },
          },
        },
      },
    },
  };

  var chart = new ApexCharts(
    document.getElementById("salesByCategoryChart"),
    options,
  );
  chart.render();
}
