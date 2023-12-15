import { extendTheme } from "@chakra-ui/react";
import { inputTheme } from "./inputTheme.ts";

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
  components: {
    Input: inputTheme,
  },
});

export default theme;

