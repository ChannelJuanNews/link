import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { createClient, Provider } from "urql";
const client = createClient({
  url: process.env.GRAPHQL || "http://localhost:3001/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            initialColorMode: "dark",
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
