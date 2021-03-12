import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import {
  createClient,
  Provider as ProviderURQL,
  dedupExchange,
  fetchExchange,
} from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";

import { GlobalContextWrapper, useGlobalContext } from "../context/globalState";

// create our URQL
const client = createClient({
  url: process.env.SERVER_GRAPHQL || "http://192.168.211.115:3001/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (result, args, cache, info) => {},
        },
      },
    }),
    fetchExchange,
  ],
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
