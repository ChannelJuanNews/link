import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { createClient, Provider as ProviderURQL } from "urql";

import { GlobalContextWrapper, useGlobalContext } from "../context/globalState";

// create our URQL
const client = createClient({
  url: process.env.GRAPHQL || "http://localhost:3001/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

import theme from "../theme";

function MyApp({ Component, pageProps }) {
  const globalState = useGlobalContext();

  console.log("global context", globalState);

  return (
    <GlobalContextWrapper>
      <ProviderURQL value={client}>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeProvider
            options={{
              initialColorMode: globalState!.mode,
            }}
          >
            <Component {...pageProps} />
          </ColorModeProvider>
        </ChakraProvider>
      </ProviderURQL>
    </GlobalContextWrapper>
  );
}

export default MyApp;
