import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(inputAnatomy.keys);

const orangeOutline = definePartsStyle({
  field: {
    border: "1px solid",
    borderColor: "orange.100",
    _hover: {
      borderColor: "orange.200",
    },
    _focusVisible: {
      border: "2px solid",
      borderColor: "orange.300",
    },
    _disabled: {
      bg: "orange.50",
    },
    _invalid: {
      border: "2px solid",
      borderColor: "red.500",
    },
  },
});

export const inputTheme = defineMultiStyleConfig({
  variants: { orangeOutline },
});
