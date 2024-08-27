/**
 * Tailwind plugin implementation
 */

const plugin = require('tailwindcss/plugin');
const { parseColor } = require('tailwindcss/lib/util/color');
const { default: createUtilityPlugin } = require('tailwindcss/lib/util/createUtilityPlugin');

module.exports = plugin(
  function (context) {
    const { matchUtilities, theme, addUtilities } = context;

    // scheme utils
    const textColors = theme('textColor');
    matchUtilities(
      {
        scheme: (value) => {
          const attrs = {};

          if (typeof value === 'object') {
            for (shade in value) {
              const parsedColor = parseColor(value[shade]);
              if (parsedColor && parsedColor.color) {
                attrs[`--scheme-${shade}`] = parsedColor.color.join(' ');
              }
            }
          }

          return attrs;
        },
      },
      { values: textColors, type: 'color' },
    );

    // col width utils
    createUtilityPlugin('width', [['col-w', ['--col-width']]])(context);

    // padding size utils
    skewindSpacing = theme('skewindSpacing');
    Object.keys(skewindSpacing).forEach((size) => {
      const [x, y] = skewindSpacing[size].map((each) => theme(`spacing[${each}]`));
      const gapX = { columnGap: x };
      const gapY = { rowGap: x };
      const pt = { paddingTop: y };
      const pb = { paddingBottom: y };
      const pl = { paddingLeft: x };
      const pr = { paddingRight: x };
      const px = { ...pl, ...pr };
      const py = { ...pt, ...pb };
      const p = { ...px, ...py };

      addUtilities({
        [`.gap-x-${size}`]: gapX,
        [`.gap-y-${size}`]: gapY,
        [`.pt-${size}`]: pt,
        [`.pb-${size}`]: pb,
        [`.pl-${size}`]: pl,
        [`.pr-${size}`]: pr,
        [`.px-${size}`]: px,
        [`.py-${size}`]: py,
        [`.p-${size}`]: p,
      });
    });
  },
  {
    theme: {
      skewindSpacing: {
        xs: [2.5, 1.5],
        sm: [4, 2.5],
        md: [7, 5],
        lg: [10, 7],
      },
    },
  },
);
