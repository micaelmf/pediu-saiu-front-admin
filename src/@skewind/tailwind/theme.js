const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("./colors");

module.exports = {
  colors: {
    scheme: {
      50: "rgb(var(--scheme-50) / <alpha-value>)",
      100: "rgb(var(--scheme-100) / <alpha-value>)",
      200: "rgb(var(--scheme-200) / <alpha-value>)",
      300: "rgb(var(--scheme-300) / <alpha-value>)",
      400: "rgb(var(--scheme-400) / <alpha-value>)",
      500: "rgb(var(--scheme-500) / <alpha-value>)",
      600: "rgb(var(--scheme-600) / <alpha-value>)",
      700: "rgb(var(--scheme-700) / <alpha-value>)",
      800: "rgb(var(--scheme-800) / <alpha-value>)",
      900: "rgb(var(--scheme-900) / <alpha-value>)",
    },
    ...colors,
    primary: colors.blue,
    success: colors.green,
    warning: colors.yellow,
    danger: colors.red,
    info: colors.sky,
  },
  fontFamily: {
    sans: ["Quicksand", ...defaultTheme.fontFamily.sans],
    mono: ["Noto Sans Mono", ...defaultTheme.fontFamily.sans],
  },
  fontWeight: {
    extralight: 300,
    light: 400,
    normal: 500,
    medium: 550,
  },
  fontSize: {
    xs: [
      ".75rem",
      {
        fontWeight: 450,
        letterSpacing: ".05em",
      },
    ],
  },
  rotate: {
    "-270": "-270deg",
    "-315": "-315deg",
  },
  strokeWidth: {
    1.5: "1.5",
  },
  screens: {
    xs: "525px",
    mobile: { max: "1023px" },
  },
  typography: (theme) => ({
    DEFAULT: {
      css: {
        a: {
          textDecoration: "none",
        },
        mark: {
          backgroundColor: `rgb(var(--scheme-200, ${colors.gray[300]}))`,
          padding: theme("spacing[0.5]"),
          paddingBottom: theme("spacing[0.5]"),
          paddingLeft: theme("spacing.1"),
          paddingRight: theme("spacing.1"),
        },
        "--tw-prose-body": colors.gray[600],
        "--tw-prose-headings": colors.gray[700],
        "--tw-prose-lead": colors.gray[600],
        "--tw-prose-links": `rgb(var(--scheme-500, ${colors.gray[800]}))`,
        "--tw-prose-bold": colors.gray[800],
        "--tw-prose-counters": colors.gray[500],
        "--tw-prose-bullets": colors.gray[300],
        "--tw-prose-hr": colors.gray[200],
        "--tw-prose-quotes": colors.gray[800],
        "--tw-prose-quote-borders": colors.gray[200],
        "--tw-prose-captions": colors.gray[500],
        "--tw-prose-code": `rgb(var(--scheme-500, ${colors.gray[800]}))`,
        "--tw-prose-pre-code": colors.gray[200],
        "--tw-prose-pre-bg": colors.gray[800],
        "--tw-prose-th-borders": colors.gray[300],
        "--tw-prose-td-borders": colors.gray[200],
        "--tw-prose-invert-body": colors.gray[300],
        "--tw-prose-invert-headings": colors.white,
        "--tw-prose-invert-lead": colors.gray[400],
        "--tw-prose-invert-links": colors.gray[100],
        "--tw-prose-invert-bold": colors.white,
        "--tw-prose-invert-counters": colors.gray[400],
        "--tw-prose-invert-bullets": colors.gray[600],
        "--tw-prose-invert-hr": colors.gray[700],
        "--tw-prose-invert-quotes": colors.gray[100],
        "--tw-prose-invert-quote-borders": colors.gray[700],
        "--tw-prose-invert-captions": colors.gray[400],
        "--tw-prose-invert-code": colors.white,
        "--tw-prose-invert-pre-code": colors.gray[300],
        "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
        "--tw-prose-invert-th-borders": colors.gray[600],
        "--tw-prose-invert-td-borders": colors.gray[700],
      },
    },
  }),
};
