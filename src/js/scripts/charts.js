import ApexCharts from "apexcharts";
import theme from "@/theme.json";

function lineChart() {
  const options = {
    title: {
      text: "Line Chart",
      align: "left",
      margin: 10,
      style: {
        fontSize: "20px",
        fontWeight: "semibold",
        color: theme.colors.gray[600],
      },
    },
    series: [
      {
        name: "Earnings",
        data: [291, 249, 187, 220, 98, 242, 296],
      },
      {
        name: "Spendings",
        data: [340, 120, 150, 196, 25, 242, 196],
      },
    ],
    colors: [theme.colors.success[400], theme.colors.danger[400]],
    chart: {
      type: "line",
      height: "100%",
      toolbar: {
        show: false,
      },
      fontFamily: theme.fontFamily.sans.join(","),
    },
    xaxis: {
      type: "categories",
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -45,
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
      theme: "dark",
      x: {
        format: "MMM",
      },
      style: {
        fontSize: "0.875rem",
        fontFamily: theme.fontFamily.sans.join(","),
      },
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          legend: {
            position: "bottom",
            floating: false,
            offsetY: 5,
          },
        },
      },
    ],
  };

  const chart = new ApexCharts(document.getElementById("lineChart"), options);
  chart.render();
}

function areaChart() {
  const options = {
    title: {
      text: "Area Chart",
      align: "left",
      margin: 10,
      style: {
        fontSize: "20px",
        fontWeight: "semibold",
        color: theme.colors.gray[600],
      },
    },
    series: [
      {
        name: "Earnings",
        data: [291, 249, 187, 220, 98, 242, 296],
      },
      {
        name: "Spendings",
        data: [30, 120, 150, 196, 25, 222, 196],
      },
    ],
    colors: [theme.colors.green[400], theme.colors.red[400]],
    chart: {
      type: "area",
      height: "100%",
      toolbar: {
        show: false,
      },
      fontFamily: theme.fontFamily.sans.join(","),
    },
    xaxis: {
      type: "categories",
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -45,
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
      theme: "dark",
      x: {
        format: "MMM",
      },
      style: {
        fontSize: "0.875rem",
        fontFamily: theme.fontFamily.sans.join(","),
      },
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          legend: {
            position: "bottom",
            floating: false,
            offsetY: 5,
          },
        },
      },
    ],
  };

  const chart = new ApexCharts(document.getElementById("areaChart"), options);
  chart.render();
}

function columnChart() {
  const options = {
    title: {
      text: "Column Chart",
      align: "left",
      margin: 10,
      style: {
        fontSize: "20px",
        fontWeight: "semibold",
        color: theme.colors.gray[600],
      },
    },
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    colors: [
      theme.colors.yellow[300],
      theme.colors.sky[400],
      theme.colors.green[400],
    ],
    chart: {
      type: "bar",
      height: "100%",
      toolbar: {
        show: false,
      },
      fontFamily: theme.fontFamily.sans.join(","),
    },
    xaxis: {
      type: "categories",
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
        style: {
          color: theme.colors.gray[500],
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -45,
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
      theme: "dark",
      y: {
        formatter: (val) => {
          return "$ " + val + " thousands";
        },
      },
      style: {
        fontSize: "0.875rem",
        fontFamily: theme.fontFamily.sans.join(","),
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          legend: {
            position: "bottom",
            floating: false,
            offsetY: 5,
          },
        },
      },
    ],
  };

  const chart = new ApexCharts(document.getElementById("columnChart"), options);
  chart.render();
}

function barChart() {
  const options = {
    title: {
      text: "Bar Chart",
      align: "left",
      margin: 10,
      style: {
        fontSize: "20px",
        fontWeight: "semibold",
        color: theme.colors.gray[600],
      },
    },
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],
    colors: [theme.colors.primary[400]],
    chart: {
      type: "bar",
      height: "100%",
      toolbar: {
        show: false,
      },
      fontFamily: theme.fontFamily.sans.join(","),
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        horizontal: true,
      },
    },
    xaxis: {
      categories: [
        "South Korea",
        "Canada",
        "United Kingdom",
        "Netherlands",
        "Italy",
        "France",
        "Japan",
        "United States",
        "China",
        "Germany",
      ],
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
      theme: "dark",
      style: {
        fontSize: "0.875rem",
        fontFamily: theme.fontFamily.sans.join(","),
      },
    },
  };

  const chart = new ApexCharts(document.getElementById("barChart"), options);
  chart.render();
}

function radarChart() {
  const options = {
    title: {
      text: "Radar Chart",
      margin: 10,
      style: {
        fontSize: "20px",
        fontWeight: "semibold",
        color: theme.colors.gray[600],
      },
    },
    series: [
      {
        name: "Series 1",
        data: [80, 50, 30, 40, 100, 20],
      },
      {
        name: "Series 2",
        data: [20, 30, 40, 80, 20, 80],
      },
      {
        name: "Series 3",
        data: [44, 76, 78, 13, 43, 10],
      },
    ],
    colors: [
      theme.colors.primary[400],
      theme.colors.red[400],
      theme.colors.green[400],
    ],
    chart: {
      type: "radar",
      height: "100%",
      fontFamily: theme.fontFamily.sans.join(","),
    },
    xaxis: {
      categories: ["2011", "2012", "2013", "2014", "2015", "2016"],
    },
    grid: {
      borderColor: theme.colors.gray[200],
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "0.875rem",
        fontFamily: theme.fontFamily.sans.join(","),
      },
    },
  };

  const chart = new ApexCharts(document.getElementById("radarChart"), options);
  chart.render();
}

function polarChart() {
  const options = {
    title: {
      text: "Polar Chart",
      margin: 10,
      style: {
        fontSize: "20px",
        fontWeight: "semibold",
        color: theme.colors.gray[600],
      },
    },
    series: [42, 47, 52, 58, 65],
    chart: {
      type: "polarArea",
      height: "100%",
      fontFamily: theme.fontFamily.sans.join(","),
    },
    labels: ["Rose A", "Rose B", "Rose C", "Rose D", "Rose E"],
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 1,
      colors: undefined,
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: "bottom",
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        color: theme.colors.primary[600],
        shadeTo: "light",
        shadeIntensity: 0.6,
      },
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "0.875rem",
        fontFamily: theme.fontFamily.sans.join(","),
      },
    },
  };

  const chart = new ApexCharts(document.getElementById("polarChart"), options);
  chart.render();
}

lineChart();
areaChart();
columnChart();
barChart();
radarChart();
polarChart();
