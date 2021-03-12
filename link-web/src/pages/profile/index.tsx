import React, { useState, useEffect } from "react";

import { NextPage } from "next";
import { useAddLinkMutation } from "../../generated/graphql";
import { NavBar } from "../../components/NavBar";

import { NextRouter, useRouter } from "next/router";

import { Formik, Field, Form } from "formik";
import { Helmet } from "react-helmet";

import prepass from "react-ssr-prepass";
import { serialize } from "cookie";

import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange,
  useQuery,
} from "urql";

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
  Menu,
  MenuButton,
  MenuItem,
  IconButton,
  MenuList,
  FormErrorMessage,
  Spacer,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from "@chakra-ui/icons";

import { useFilePicker } from "react-sage";
import { withUrqlClient, initUrqlClient, NextUrqlPageContext } from "next-urql";

// utility imports
import loadFile from "../../util/loadFile";
import isValidUrl from "../../util/isValidUrl";
import withHttp from "../../util/withHttp";
import parseCookie from "../../util/parseCookie";

interface registerProps {
  ssr: any;
}

const Profile: NextPage<registerProps> = (props) => {
  console.log("THE PROPS IN THE PROFILE PAGE ARE", props);

  // whenever we want to do some "pesudo global state persistance"
  // const [state, setState] = useState(props)

  // platform agnostic
  const router = useRouter();
  const [dataUrls, setDataUrls] = useState([]);
  const [changed, setChanged] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [result, addLink] = useAddLinkMutation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  //const [{ data, fetching }] = useMeQuery(props.ssr ? props.ssr : null);
  //console.log("THE DATA IZZZZZZZZZ", data);

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
      // if a user uploaded a file
      if (data.length > 0) {
        console.log("UPLOAD FILE HERE", data, typeof data);
      }
    };

    getDataUrls();
  }, [files]);

  useEffect(() => {
    setIsRefreshing(false);
  }, [props]);

  // this route will ALWAYS be server side rendered, so keep that in mind

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <NavBar profile={true} />
      <Center my={12}>
        <>{changed ? <div> save button here </div> : null}</>

        <VStack>
          <Wrap>
            <WrapItem>
              {isRefreshing ? (
                <Avatar size="2xl" loading="eager" icon={<Spinner />} />
              ) : (
                <Avatar
                  onClick={() => {
                    setIsRefreshing(true);
                  }}
                  getInitials={(name) => {
                    return name.substring(0, 5);
                  }}
                  icon={isRefreshing ? <Spinner /> : null}
                  size="2xl"
                  name={props?.ssr.me.user.username}
                  loading="eager"
                  showBorder={true}
                  src={(() => {
                    // if the user has a profile url attached, we render the URL
                    // otherwise we render empty string
                    if (props?.ssr.me.user?.avatar) {
                      return props?.ssr.me.user?.avatar;
                    }
                    // if the user uploads a photo, immediately show that uploaded photo
                    // then we call the upload photo function within useEffect
                    // then we refresh server side props to get ssr
                    if (dataUrls) {
                      //console.log(dataUrls[0]);
                      return dataUrls[0];
                    } else {
                      return "";
                    }
                  })()}
                />
              )}
            </WrapItem>
          </Wrap>

          {/* here we want to allow the user to upload a file */}
          <Link
            onClick={(e) => {
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

          <Spacer m={5} />

          {/* this is where we begin the process of showing the links */}

          {props?.ssr.me.user.links
            ? props?.ssr.me.user.links.map((link, index) => {
                console.log(link);
                return (
                  <Link
                    href={withHttp(link.url)}
                    key={index}
                    target="_blank"
                    textDecoration="none"
                    m="0"
                    p="0"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Box
                      w={[330, 430, 630]}
                      rightIcon={
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<HamburgerIcon />}
                            size="xs"
                            variant="outline"
                          />
                          <MenuList>
                            <MenuItem icon={<AddIcon />} command="⌘T">
                              New Tab
                            </MenuItem>
                            <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
                              New Window
                            </MenuItem>
                            <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
                              Open Closed Tab
                            </MenuItem>
                            <MenuItem icon={<EditIcon />} command="⌘O">
                              Open File...
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      }
                    >
                      <Button
                        size="lg"
                        height="48px"
                        width="100%"
                        border="2px"
                        colorScheme="twitter"
                        variant="solid"
                        _hover={{
                          bgColor: "linkedin.500",
                          textDecoration: "none",
                        }}
                      >
                        {" "}
                        {link.title}{" "}
                      </Button>
                    </Box>
                  </Link>
                );
              })
            : null}

          {/* button to add links */}
          <Spacer m={8} />
          <Box w={[330, 430, 630]}>
            <Button
              onClick={onOpen}
              size="lg"
              height="48px"
              width="100%"
              border="2px"
              colorScheme="purple"
              variant="solid"
              _hover={{
                bgColor: "linkedin.500",
                textDecoration: "none",
              }}
            >
              Add Link{" "}
            </Button>
          </Box>
        </VStack>

        {/* modal goes here */}

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          size="lg"
          motionPreset="slideInBottom"
        >
          <ModalOverlay color="red" />
          <ModalContent
            css={{
              backgroundColor: "#1A202C",
            }}
          >
            <ModalHeader> Add a link to your profile </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Formik
                initialValues={{ title: "", urlinput: "" }}
                onSubmit={async (values, actions) => {
                  console.log("values are", values, actions);
                  addLink({
                    url: values.urlinput,
                    title: values.title,
                  }).then((result) => {
                    console.log("executed the mutation", result);
                    setIsRefreshing(true);
                    refreshData();
                    onClose();
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
                            ref={initialRef}
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
                      <Button
                        colorScheme="blue"
                        mr={3}
                        type="submit"
                        isLoading={isRefreshing}
                      >
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
      </Center>
    </>
  );
};

export async function getServerSideProps(context) {
  // first thing's first get the request and response objects
  const { res, req } = context;

  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: process.env.GRAPHQL_URL || "http://localhost:3001/graphql",
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
      fetchOptions: {
        headers: {
          Cookie: req.headers.cookie,
        },
      },
    },
    false
  );

  // parse the cookie for our own use
  const parsedCookie = parseCookie(req.headers.cookie || "");

  // if the HTTP only cookie is available, then we can render server side log in with server side props
  if (parsedCookie[process.env.COOKIE_NAME || "link:id"]) {
    // we only get here if there is a named  httpOnly cookie with the `key` of `link:id`
    // if someone fakes the cookie, we can rely on the session validation logic on our graphql server

    // This query is used to populate the cache for the query
    // used on this page.
    // TODO: figure out how to store these queries in a different file
    await client
      .query(
        `query {
        me {
          user {
            username
            links {
              url
              icon
              title
            }
          }
          error {
            message
            code
          }
        }
      }
      `
      )
      .toPromise();

    // the graphql data that is returned is a JSON string
    // so we need to parse the data accroding to the structure of the returned object
    // and then inject the return value into our props to then be rendered on the server side
    // which will return HTML which will then be indexed by several search engines and will lead to a faster page load

    let data = ssrCache.extractData();
    let serialized;

    Object.keys(data).map((key) => {
      if (!serialized) {
        serialized = JSON.parse(data[key].data);
      }
    });

    // TODO:
    // if there is an error with the query, set a cookie error and return the response
    if (serialized.error) {
      //
    }

    console.log("serialized is", serialized);

    return {
      props: {
        ssr: { ...serialized },
      },
    };
  } else {
    // if no user is logged in, redirect the user back to the `/` route
    console.log("WE ARE REDIRECTING");
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}

export default Profile;
