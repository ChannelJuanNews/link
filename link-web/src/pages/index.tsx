import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";

import parseCookie from "../util/parseCookie";
import { destroyCookie } from "nookies";

import { Center, Box } from "@chakra-ui/react";

const Index = (props) => {
  const [error, setError] = useState();

  useEffect(() => {
    let c = parseCookie(document.cookie);
    console.log("cookie is", c);
    setError(c["link:error"]);
  }, []);

  return (
    <>
      {" "}
      {error
        ? (() => {
            destroyCookie(null, "link:error");

            return (
              <Center bgColor="tomato">
                <Box m={2}>
                  <div> {error} </div>
                </Box>
              </Center>
            );
          })()
        : null}
      <NavBar landing={true} /> <div> Hello World </div>{" "}
    </>
  );
};

export default Index;
