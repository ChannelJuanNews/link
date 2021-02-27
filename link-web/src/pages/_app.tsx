import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { createClient } from "urql";
const client = createClient({
  url: process.env.GRAPHQL || "http://localhost:3001/graphql",
});

import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
