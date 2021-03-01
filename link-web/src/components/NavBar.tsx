import React from "react";
import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex bg="blueviolet" p={4} boxShadow="lg">
      <Box ml={"auto"}>
        <Link href="/register">
          {" "}
          <Button colorScheme="linkedin"> Register </Button>{" "}
        </Link>
      </Box>
    </Flex>
  );
};
