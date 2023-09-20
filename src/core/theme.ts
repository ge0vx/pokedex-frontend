import { createTheme } from "@mui/material/styles";

const pokedexTheme = createTheme({
    palette: {
      mode: "light",
      text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.6)",
        disabled: "rgba(0, 0, 0, 0.38)"
      },
      primary: {
        main: "#0076B4",
        dark: "#004B84",
        light: "#56A5E6",
      },
      secondary: {
        main: "#512D6D",
        dark: "#250441",
        light: "#7F589C"
      },
      action: {
        active: "rgba(0, 0, 0, 0.54)",
        hover: "rgba(0, 0, 0, 0.04)",
        selected: "rgba(0, 0, 0, 0.08)",
        disabled: "rgba(0, 0, 0, 0.26)",
        disabledBackground: "rgba(0, 0, 0, 0.12)",
        focus: "rgba(0, 0, 0, 0.12)"
      },
      error:{
        main: "#CB2C30",
        dark: "#930009",
        light: "#FF625A"
      },
      warning:{
        main: "#FFAA00",
        dark: "#C67B00",
        light: "#FFDC4A"
      },
      info:{
        main: "#2196F3",
        dark: "#0B79D0",
        light: "#64B6F7"
      },
      success: {
        main: "#1B783E",
        dark: "#004B15",
        light: "#51A86A"
      }
    }
  });

  export default pokedexTheme;