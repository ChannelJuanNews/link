import React, { useState, useEffect } from "react";

import { NextPage } from "next";
import { MeQuery, useMeQuery } from "../../generated/graphql";
import { NavBar } from "../../components/NavBar";

import { NextRouter, useRouter } from "next/router";

import { Formik, Field, Form } from "formik";

import { Helmet } from "react-helmet";

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
  Link,
  FormErrorMessage,
  Spacer,
} from "@chakra-ui/react";

import { useFilePicker } from "react-sage";

// utility imports
import loadFile from "../../util/loadFile";
import isValidUrl from "../../util/isValidUrl";

function getBody(
  data: MeQuery,
  router: NextRouter,
  initialRef: React.MutableRefObject<undefined>,
  finalRef: React.MutableRefObject<undefined>,
  isOpen: boolean,
  onOpen: any,
  onClose: any,
  onFileClick: any,
  dataUrls: any,
  HiddenFileInput: any,
  fileErrors: any,
  setChanged: any,
  setLinks: any,
  links: any
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
              <Avatar
                size="2xl"
                name={data.me.user.username.substr(0, 2)}
                src={(() => {
                  if (dataUrls) {
                    //console.log(dataUrls[0]);
                    return dataUrls[0];
                  } else {
                    return "";
                  }
                })()}
              />
            </WrapItem>
          </Wrap>
          <Link
            onClick={(e) => {
              console.log("WE ARE HERE", onFileClick);
              onFileClick();
            }}
          >
            {" "}
            <Text> Change Avatar </Text>{" "}
          </Link>
          <HiddenFileInput accept=".jpg, .jpeg, .png" multiple={false} />
          {fileErrors.hasInvalidFileSize
            ? `Cannot be greater than ${process.env.MAX_FILE_SIZE || 5}mb`
            : "no"}

          {fileErrors.hasInvalidImage ? "yes" : "no"}

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
            <ModalHeader> Add a link to your profile </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Formik
                initialValues={{ title: "", urlinput: "" }}
                onSubmit={(values, actions) => {
                  console.log("values are", values, actions);
                  links.push({
                    title: values.title,
                    url: values.urlinput,
                    priority: links.length,
                  });
                }}
              >
                {(props) => (
                  <Form>
                    <Field
                      name="title"
                      validate={(e) => {
                        if (e.length <= 45) return false;
                        return true;
                      }}
                    >
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            props.errors?.title && props.touched?.title
                          }
                        >
                          <FormLabel htmlFor="title">Title</FormLabel>
                          <Input
                            {...field}
                            id="title"
                            placeholder="e.g. My Course Name"
                          />
                          <FormErrorMessage>
                            {props.errors?.title
                              ? "Link title must be less than 45 characters"
                              : null}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field
                      name="urlinput"
                      validate={(e) => {
                        // TODO: implement validation logic
                        return !isValidUrl(e);
                      }}
                    >
                      {({ field, form }) => (
                        <FormControl
                          mt={4}
                          isInvalid={
                            props.errors?.urlinput && props.touched?.urlinput
                          }
                        >
                          <FormLabel htmlFor="urlinput"> URL </FormLabel>
                          <Input
                            id="urlinput"
                            {...field}
                            placeholder="e.g. https://mywebsite.com/path/to/cool/stuff"
                          />
                          <FormErrorMessage>
                            {props.errors?.urlinput
                              ? "Please enter a valid URL"
                              : null}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Flex ml={0} my={5} mb={-2}>
                      <Spacer />
                      <Button colorScheme="blue" mr={3} type="submit">
                        Add
                      </Button>
                      <Button onClick={onClose} type="button">
                        Cancel
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </ModalBody>
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
  const [dataUrls, setDataUrls] = useState([]);
  const [changed, setChanged] = useState(false);
  const [links, setLinks] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const {
    files,
    onClick: onFileClick,
    errors: fileErrors,
    HiddenFileInput,
  } = useFilePicker({
    maxFileSize: Number(process.env.MAX_FILE_SIZE) || 5,
    maxImageWidth: 1000,
    imageQuality: 0.92,
    resizeImage: true,
  });

  useEffect(() => {
    const getDataUrls = async (): Promise<void> => {
      const data = await Promise.all(files.map(loadFile));
      setDataUrls(data);
    };
    getDataUrls();
  }, [files]);

  useEffect(() => {
    console.log("THE LOADED DATA IS", data);
    if (data?.me?.user?.links) {
      setLinks(data?.me?.user?.links);
    }
  }, [data]);

  console.log("the data is", data, fetching);

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <NavBar profile={true} />
      <Center my={12}>
        {fetching ? (
          <Spinner />
        ) : (
          <>
            {changed ? <div> save button here </div> : null}
            {getBody(
              data,
              router,
              initialRef,
              finalRef,
              isOpen,
              onOpen,
              onClose,
              onFileClick,
              dataUrls,
              HiddenFileInput,
              fileErrors,
              setChanged,
              setLinks,
              links
            )}
          </>
        )}
      </Center>

      <></>
    </>
  );
};

export default Profile;
