"use server"

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    tableHd: {
      500: "#9598A0",
    },
  },
});

export { theme };
