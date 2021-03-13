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
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";

import HamburgerIcon from "../components/icons/hamburger";

interface NavBarProps {
  page?: String;
  profile?: Boolean;
  landing?: Boolean;
}

export const NavBar: React.FC<NavBarProps> = ({
  profile = false,
  landing = true,
}) => {
  // get the router to see what path we are on
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();

  if (data?.me.user && router.pathname !== "/profile") {
    // if the user exists, redirect the user to the profile page
    router.push("/profile");
  }

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
            {/* this is for testing purposes */}
            <NextLink href="/profile">
              <Link style={{ textDecoration: "none" }}>
                <Button colorScheme="linkedin" style={{ outline: "none" }}>
                  {" "}
                  Profile{" "}
                </Button>{" "}
              </Link>
            </NextLink>
          </>
        )}

        <Button onClick={onOpen} colorScheme="linkedin">
          {" "}
          <HamburgerIcon />{" "}
        </Button>
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
