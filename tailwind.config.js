export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        tab: "920px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1366px",
        "3xl" : "1441px"
      },
      // fontFamily: {
      //   display: "Oswald, ui-serif", // Adds a new `font-display` class
      // },
      colors: {
        black: "#1F242E",
        blue: "#474DF4",
        "blue-100": "#356ADB",
        bggray: "#F9FAFC",
        bordercolor: "#D1D5DE",
        gray: "#4E5663",
        borderlight: "#E9EBF0",
      },
      padding: {
        secpadding: "128px",
        96: "96px",
        80: "80px",
        40: "40px",
      },
      margin: {
        secmargin: "128px",
        96: "96px",
        40: "40px",
      },
      boxShadow: {
        shadow: "0px 1.75px 4px -1px rgba(15, 17, 20, 0.10)",
        shadow2: "0px 1px 2px 0px rgba(17, 24, 39, 0.05)",
        shadow3: "0px 4px 6px -2px rgba(15, 17, 20, 0.04), 0px 10px 16px -3px rgba(15, 17, 20, 0.06)",
        shadow4: " 0px 1px 2px 0px rgba(15, 17, 20, 0.06)"
      },
    },
  },
  plugins: [],
};
