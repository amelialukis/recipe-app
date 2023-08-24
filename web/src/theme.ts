import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Indie Flower', sans-serif`,
    body: `'Neucha', sans-serif`,
  },
  styles: {
    global: {
      body: {
        letterSpacing: "1px",
        fontWeight: "200",
        fontSize: "xl",
      },
      button: {
        letterSpacing: "2px",
        size: "xl",
      },
    },
  },
});

export default theme;
