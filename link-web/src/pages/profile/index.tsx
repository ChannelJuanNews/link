import React from "react";

import { NextPage } from "next";
import { MeQuery, useMeQuery } from "../../generated/graphql";
import { NavBar } from "../../components/NavBar";

import { NextRouter, useRouter } from "next/router";

import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  WrapItem,
  Wrap,
  Spinner,
  Flex,
  Center,
  Text,
  VStack,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";

function getBody(
  data: MeQuery,
  router: NextRouter,
  initialRef: React.MutableRefObject<undefined>,
  finalRef: React.MutableRefObject<undefined>,
  isOpen: boolean,
  onOpen: any,
  onClose: any
) {
  console.log(data);

  // if there is an error
  if (data.me.error) {
    router.push("/");
  }

  // if there is no user
  else if (!data.me.user) {
    router.push("/");
  }
  // if there is a user
  else if (data.me.user) {
    return (
      <>
        <VStack>
          <Wrap>
            <WrapItem>
              <Avatar size="2xl" name={data.me.user.username.substr(0, 2)} />
            </WrapItem>
          </Wrap>
          <Text> Change Avatar </Text>
          <Box py={8}>
            <Button onClick={onOpen}> Add Link </Button>
          </Box>
        </VStack>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input ref={initialRef} placeholder="e.g. My Course Name" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel> URL </FormLabel>
                <Input placeholder="e.g. https://myspace.com/username" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
}

interface registerProps {}

const Profile: NextPage<registerProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  console.log("the data is", data, fetching);

  return (
    <>
      <NavBar profile={true} />

      <Center my={12}>
        {fetching ? (
          <Spinner />
        ) : (
          getBody(data, router, initialRef, finalRef, isOpen, onOpen, onClose)
        )}
      </Center>

      <></>
    </>
  );
};

export default Profile;
