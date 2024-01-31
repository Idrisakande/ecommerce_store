/**
 * @type {import('tailwindcss').Config}
 * */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "357px",
      sm: "640px",
      md: "880px",
      lg: "1280px",
      xl: "1440px",
      "2xl": "1680px",
      "3xl": "1920px",
      "4xl": "2240px",
    },
    extend: {
      backgroundImage: {
        "home-bg3": "url('/assets/imgs/homebg3.png')",
        "home-bg4": "url('/assets/imgs/homebg4.png')",
        "gradient-afruna": "linear-gradient(135deg, #FFD3A5 0%, #FBDEC0 100%)",
        "gradient-sidebar":
          "linear-gradient(135.58deg, #FFFFFF -1.05%, #F4F5FF 100%)",
        "gradient-whitishblue":
          "linear-gradient(to right bottom , #41d3ef 10%, #0D2FDD 70%)",
        "gradient-y-deepblue":
          "linear-gradient(to bottom , #41d3ef 3%, #0C1340 96%)",
        "gradient-bluebutton":
          "linear-gradient(180.37deg, #4A90ED 13.5%, #06AEEE 100%)",
        "gradient-deepBluebutton":
          "linear-gradient(180deg,  #130CCA 5%, #52E5E7 100%)",

        "gradient-lightBluebutton":
          "linear-gradient(130.37deg, #06AEEE 19.33%, #4B93FF 100%)",
        "gradient-green": "linear-gradient(180deg, #CDF7EC 0%, #FCFDFF 100%)",
        "gradient-purple": "linear-gradient(180deg, #D1E3FF 0%, #FCFDFF 100%)",
        "gradient-deepSmallBlue":
          "linear-gradient(130.37deg, #0177B7 19.33%, #3C3C5D 100%)",
        "gradient-lightGreenGradient":
          "linear-gradient(130.37deg, #92FE9D 19.33%, #2CC574 100%)",
        "gradient-topBottomBlueGradient":
          "linear-gradient(180deg, #0C0E3B 0%, #71AAFF 100%)",
        "gradient-topBottomBlue":
          "linear-gradient(180deg, #00AEEF 0%, #0C0E3B 100%)",
        "gradient-blue": "linear-gradient(0deg, #0177B7, #0177B7)",
        "gradient-lightblue": "linear-gradient(0deg, #1F74A2, #1F74A2)",
        "gradient-leftRightBlue":
          "linear-gradient(82.28deg, #52E5E7 -11.67%, #00AEEF 103.11%)",
        "gradient-yellowGray":
          "linear-gradient(112.82deg, #FEE3C6 39.7%, rgba(148, 185, 233, 0.66) 107.91%)",
        "gradient-yellowGrayToBottom":
          "linear-gradient(to bottom , #FEE3C6 3%, #D9D9D9 96%)",
        "gradient-lightGradient":
          "linear-gradient(135deg, #F2F4FF 0%, #FAFAFF 100%)",
        "gradient-grayPurpleGradient":
          "linear-gradient(180deg, rgba(12, 14, 59, 0.68) 0%, rgba(12, 14, 59, 0.68) 100%)",
        "gradient-outofstock":
          "linear-gradient(180deg, #ECECEC 0%, #DBDBDB 100%)",

        // generate tailwind custom background image utilities settings
      },
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "afruna-base": "#3C3C3C",
        "afruna-blue": "#0C0E3B",
        "afruna-gold": "#FF9017",
        "afruna-gray": "#595858",
      },
    },
  },
  plugins: [],
};
