import React from "react";
import {
  Box,
  Flex,
  Button,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Drawer,
  DrawerFooter,
  useDisclosure,
  Link,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";

import Image from "next/image";

import NextLink from "next/link";

interface NavBarProps {
  page?: String;
  profile?: Boolean;
  landing?: Boolean;
}

export const NavBar: React.FC<NavBarProps> = ({
  profile = false,
  landing = true,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex bg="blueviolet" p={4} boxShadow="lg">
      <Box ml={"auto"}>
        {profile ? null : (
          <>
            <NextLink href="/login">
              <Link style={{ textDecoration: "none" }}>
                <Button colorScheme="linkedin" style={{ outline: "none" }}>
                  {" "}
                  Login{" "}
                </Button>{" "}
              </Link>
            </NextLink>

            <NextLink href="/register">
              <Link style={{ textDecoration: "none" }}>
                <Button colorScheme="linkedin" style={{ outline: "none" }}>
                  {" "}
                  Register{" "}
                </Button>{" "}
              </Link>
            </NextLink>
          </>
        )}

        <Button onClick={onOpen}>Open Drawer</Button>
      </Box>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="blueviolet">
          <DrawerHeader borderBottomWidth="1px">
            {" "}
            <DrawerCloseButton /> Basic Drawer
          </DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
