// deno-lint-ignore-file ban-types
/*****************************************************************************
 *
 * Generic Types
 *
 ****************************************************************************/

type CSSProps = {
  [K in Exclude<keyof CSSStyleDeclaration, 'parentRule' | 'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | 'setProperty'>]?: CSSStyleDeclaration[K] extends null | Function 
    ? never 
    : CSSStyleDeclaration[K];
};

type Style = CSSProps & {
  className?: string;
} & {
  [key: string]: string | number | CSSProps | Style ;
};

declare global{
  interface ObjectConstructor {
    assign<T extends Record<string, unknown>, E1>(target: T, source: E1): T & E1;
    assign<T extends Record<string, unknown>, E1, E2>(target: T, source1: E1, source2: E2): T & E1 & E2;
    assign<T extends Record<string, unknown>, E1, E2, E3>(target: T, source1: E1, source2: E2, source3: E3): T & E1 & E2 & E3;
    assign<T extends Record<string, unknown>, E1, E2, E3, E4>(target: T, source1: E1, source2: E2, source3: E3, source4: E4): T & E1 & E2 & E3 & E4;
    assign<T extends Record<string, unknown>, E1, E2, E3, E4, E5>(target: T, source1: E1, source2: E2, source3: E3, source4: E4, source5: E5): T & E1 & E2 & E3 & E4 & E5;
    assign<T extends Record<string, unknown>, E1, E2, E3, E4, E5, E6>(target: T, source1: E1, source2: E2, source3: E3, source4: E4, source5: E5, source6: E6): T & E1 & E2 & E3 & E4 & E5 & E6;
    assign<T extends Record<string, unknown>, E1, E2, E3, E4, E5, E6, E7>(target: T, source1: E1, source2: E2, source3: E3, source4: E4, source5: E5, source6: E6, source7: E7): T & E1 & E2 & E3 & E4 & E5 & E6 & E7;
    assign<T extends Record<string, unknown>, E1, E2, E3, E4, E5, E6, E7, E8>(target: T, source1: E1, source2: E2, source3: E3, source4: E4, source5: E5, source6: E6, source7: E7, source8: E8): T & E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8;
    assign<T extends Record<string, unknown>, E1, E2, E3, E4, E5, E6, E7, E8, E9>(target: T, source1: E1, source2: E2, source3: E3, source4: E4, source5: E5, source6: E6, source7: E7, source8: E8, source9: E9): T & E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8 & E9;
    assign<T extends Record<string, unknown>, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10>(target: T, source1: E1, source2: E2, source3: E3, source4: E4, source5: E5, source6: E6, source7: E7, source8: E8, source9: E9, source10: E10): T & E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8 & E9 & E10;
    assign<T extends Record<string, unknown>, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11>(target: T, source1: E1, source2: E2, source3: E3, source4: E4, source5: E5, source6: E6, source7: E7, source8: E8, source9: E9, source10: E10, source11: E11): T & E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8 & E9 & E10 & E11;
    assign<T extends Record<string, unknown>, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12>(target: T, source1: E1, source2: E2, source3: E3, source4: E4, source5: E5, source6: E6, source7: E7, source8: E8, source9: E9, source10: E10, source11: E11, source12: E12): T & E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8 & E9 & E10 & E11 & E12;
    assign<T extends Record<string, unknown>, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13>(target: T, source1: E1, source2: E2, source3: E3, source4: E4, source5: E5, source6: E6, source7: E7, source8: E8, source9: E9, source10: E10, source11: E11, source12: E12, source13: E13): T & E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8 & E9 & E10 & E11 & E12 & E13;
    assign<T extends Record<string, unknown>, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14>(target: T, source1: E1, source2: E2, source3: E3, source4: E4, source5: E5, source6: E6, source7: E7, source8: E8, source9: E9, source10: E10, source11: E11, source12: E12, source13: E13, source14: E14): T & E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8 & E9 & E10 & E11 & E12 & E13 & E14;  
    assign<T extends Record<string, unknown>, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15>(target: T, source1: E1, source2: E2, source3: E3, source4: E4, source5: E5, source6: E6, source7: E7, source8: E8, source9: E9, source10: E10, source11: E11, source12: E12, source13: E13, source14: E14, source15: E15): T & E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8 & E9 & E10 & E11 & E12 & E13 & E14 & E15;
    assign<T extends Record<string, unknown>, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16>(target: T, source1: E1, source2: E2, source3: E3, source4: E4, source5: E5, source6: E6, source7: E7, source8: E8, source9: E9, source10: E10, source11: E11, source12: E12, source13: E13, source14: E14, source15: E15, source16: E16): T & E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8 & E9 & E10 & E11 & E12 & E13 & E14 & E15 & E16;
    assign<T extends Record<string, unknown>, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16, E17>(target: T, source1: E1, source2: E2, source3: E3, source4: E4, source5: E5, source6: E6, source7: E7, source8: E8, source9: E9, source10: E10, source11: E11, source12: E12, source13: E13, source14: E14, source15: E15, source16: E16, source17: E17): T & E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8 & E9 & E10 & E11 & E12 & E13 & E14 & E15 & E16 & E17;
    assign<T extends Record<string, unknown>, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16, E17, E18>(target: T, source1: E1, source2: E2, source3: E3, source4: E4, source5: E5, source6: E6, source7: E7, source8: E8, source9: E9, source10: E10, source11: E11, source12: E12, source13: E13, source14: E14, source15: E15, source16: E16, source17: E17, source18: E18): T & E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8 & E9 & E10 & E11 & E12 & E13 & E14 & E15 & E16 & E17 & E18;
    assign<T extends Record<string, unknown>, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16, E17, E18, E19>(target: T, source1: E1, source2: E2, source3: E3, source4: E4, source5: E5, source6: E6, source7: E7, source8: E8, source9: E9, source10: E10, source11: E11, source12: E12, source13: E13, source14: E14, source15: E15, source16: E16, source17: E17, source18: E18, source19: E19): T & E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8 & E9 & E10 & E11 & E12 & E13 & E14 & E15 & E16 & E17 & E18 & E19;
    assign<T extends Record<string, unknown>, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16, E17, E18, E19, E20>(target: T, source1: E1, source2: E2, source3: E3, source4: E4, source5: E5, source6: E6, source7: E7, source8: E8, source9: E9, source10: E10, source11: E11, source12: E12, source13: E13, source14: E14, source15: E15, source16: E16, source17: E17, source18: E18, source19: E19, source20: E20): T & E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8 & E9 & E10 & E11 & E12 & E13 & E14 & E15 & E16 & E17 & E18 & E19 & E20;
    assign(target: object, ...sources: unknown[]): unknown;
  }
}

/*****************************************************************************
 *
 * Utility functions for CSS units
 *
 ****************************************************************************/

const rem = (value: number) => `${value}rem`;
const px = (value: number) => `${value}px`;


/*****************************************************************************
 *
 * Utility classes to avoid typing the same CSS properties over and over
 *
 ****************************************************************************/

function generateDimension<K extends string, V extends string>(
  pairs: Record<K, keyof Style>,
  sizes: V[]
): { [P in `${K}_${number}`]: Style } {
  const result: Record<string, Style> = {};

  Object.entries(pairs).forEach(([abbr, propName]) => {
    sizes.forEach((size, index) => {
      const key = `${abbr}_${index}`;
      result[key] = { [propName as string]: size };
    });
  });

  return result as { [P in `${K}_${number}`]: Style };
}

function generateEnum(
  propertyName: keyof Style,
  values: string[]
): Record<string, Style> {
  return Object.fromEntries(
    values.map((value) => [value, { [propertyName]: value }])
  );
}

/*****************************************************************************
 *
 * CSS Generator
 *
 ****************************************************************************/

const generateCSS = (className: string, styles: Style, compressed = true) => {
  const cssString: string[] = [`${className} {`];
  const additionalStyles: string[] = [];
  for (const [key, value] of Object.entries(styles)) {
    if (typeof value === "object") {
      const subStyle = value as Style;
      const subClassName = key
        .split(",")
        .map((sub) => {
          sub = sub.trim();
          const selector = sub.includes("&")
            ? sub.replace("&", `${className}`)
            : `${className} ${sub}`;
          return selector;
        })
        .join(", ");
      additionalStyles.push(generateCSS(subClassName, subStyle, compressed));
    } else {
      cssString.push(`  ${key}: ${value};`);
    }
  }
  cssString.push("}");
  cssString.push(...additionalStyles);
  return cssString.join(compressed ? "" : "\n");
};

/*****************************************************************************
 *
 * Generating Utility classes (e.g, Tailwind)
 *
 ****************************************************************************/

function createUtilityStyles() {

  const sizes = [
    "0",
    rem(0.25),
    rem(0.5),
    rem(1),
    rem(1.25),
    rem(1.5),
    rem(1.75),
    rem(2),
    rem(3),
    rem(4),
    rem(5),
    rem(7.5),
    rem(10),
    rem(15),
    rem(20),
    rem(30),
  ];

  const marginStyles = generateDimension(
    {
      m: "margin",
      mt: "marginBlockStart",
      mr: "marginInlineEnd",
      mb: "marginBlockEnd",
      ml: "marginInlineStart",
    },
    sizes
  );

  const paddingStyles = generateDimension(
    {
      p: "padding",
      pt: "paddingBlockStart",
      pr: "paddingInlineEnd",
      pb: "paddingBlockEnd",
      pl: "paddingInlineStart",
    },
    sizes
  );

  const borderStyles = generateDimension(
    {
      b: "border",
      bt: "borderBlockStartWidth",
      br: "borderInlineEndWidth",
      bb: "borderBlockEndWidth",
      bl: "borderInlineStartWidth",
    },
    [px(1), px(2), px(5), px(10), px(25)]
  );

  const roundedStyles = Object.assign(
    generateDimension(
      {
        rounded: "borderRadius",
        rounded_tl: "borderTopLeftRadius",
        rounded_tr: "borderTopRightRadius",
        rounded_br: "borderBottomRightRadius",
        rounded_bl: "borderBottomLeftRadius",
      },
      [px(2), px(5), rem(1), rem(2), rem(4), rem(8)]
    ),
    {
      round: { borderRadius: "1e5px" } as Style,
    }
  );

  const displayStyles = generateEnum("display", [
    "block",
    "inline",
    "inline-block",
    "flex",
    "grid",
  ]);

  const borderStyleStyles = generateEnum("borderStyle", [
    "solid",
    "dashed",
    "dotted",
    "double",
    "none",
  ]);

  const fontWeightStyles = generateDimension(
    {
      font: "fontWeight",
    },
    [100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => x.toString())
  );

  const lineHeightStyles = generateDimension(
    {
      leading: "lineHeight",
    },
    [1.1, 1.25, 1.375, 1.5, 1.75, 2].map((x) => x.toString())
  );

  const fontSizeStyles = generateDimension(
    {
      text: "fontSize",
    },
    [rem(1), rem(1.1), rem(1.25), rem(1.5), rem(2), rem(2.5), rem(3), rem(3.5)]
  );

  const fontStylesPresets = {
    textXs: rem(0.75),
    textSm: rem(0.875),
    textBase: rem(1),
    textLg: rem(1.125),
    textXl: rem(1.25),
  };

  const aspectRatioStyles = {
    square: { aspectRatio: "1" } as Style,
    landscape: { aspectRatio: "4/3" } as Style,
    portrait: { aspectRatio: "3/4" } as Style,
    widescreen: { aspectRatio: "16/9" } as Style,
    ultrawide: { aspectRatio: "18/5" } as Style,
    golden: { aspectRatio: "1.6180/1" } as Style,
  };

  return Object.assign(
    {
      noPaddingMargin: { padding: "0", margin: "0" } as Style,
    },
    marginStyles,
    paddingStyles,
    borderStyles,
    roundedStyles,
    displayStyles,
    borderStyleStyles,
    aspectRatioStyles,
    fontWeightStyles,
    lineHeightStyles,
    fontSizeStyles,
    fontStylesPresets
  );
}

/*****************************************************************************
 *
 * Setting up Proxy
 *
 ****************************************************************************/

const utilityClasses = createUtilityStyles();

const styleProxy = new Proxy(utilityClasses, {
  get: (target, prop, receiver) => {
    return Reflect.get(target, prop, receiver);
  },
});

/*****************************************************************************
 *
 * Test use
 *
 ****************************************************************************/

const {
  block,
  mt_1,
  border_1,
  borderDashed,
  p_4,
  inline,
  noPaddingMargin,
  square,
} = styleProxy;

const css = generateCSS(
  ".challenge",
  {
    ...block,
    ...mt_1,
    ...border_1,
    ...borderDashed,
    ...square,
    ...p_4,
     [`&Title, p:first-of-type`]: {
       ...inline,
       ...noPaddingMargin,
     },
     ".hint": {
       color: 'red'
     },
  },
  false
);

console.log(css)