import React, { useState, useEffect } from "react";

import { NextPage } from "next";
import { MeQuery, useMeQuery } from "../../generated/graphql";
import { NavBar } from "../../components/NavBar";

import { NextRouter, useRouter } from "next/router";

import { Formik, Field, Form } from "formik";
import { Helmet } from "react-helmet";

import prepass from "react-ssr-prepass";

import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange,
  useQuery,
} from "urql";

import { withUrqlClient, initUrqlClient } from "next-urql";

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
import withHttp from "../../util/withHttp";
import parseCookie from "../../util/parseCookie";

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
    console.log("THE LINKS", links);
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

          {links.map((link, index) => {
            console.log(link);
            return (
              <Link
                href={withHttp(link.url)}
                key={index}
                target="_blank"
                textDecoration="none"
              >
                <Button
                  ml={4}
                  mr={4}
                  colorScheme="linkedin"
                  p={3}
                  variant="outline"
                  _hover={{ bgColor: "linkedin.500", textDecoration: "none" }}
                >
                  {" "}
                  {link.title}{" "}
                </Button>
              </Link>
            );
          })}

          <Box py={8}>
            <Button
              onClick={onOpen}
              bgColor="linkedin.700"
              _hover={{ bg: "linkedin.500" }}
            >
              {" "}
              Add Link{" "}
            </Button>
          </Box>
        </VStack>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
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

interface registerProps {
  ssr: any;
}

const Profile: NextPage<registerProps> = (props) => {
  // platform agnostic
  const router = useRouter();
  const [dataUrls, setDataUrls] = useState([]);
  const [changed, setChanged] = useState(false);
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

  // if server side rendered
  if (!!props.ssr.me.user) {
    // server only
    const [links, setLinks] = useState(props.ssr.me.user.links);

    return (
      <>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <NavBar profile={true} />
        <Center my={12}>
          <>
            {changed ? <div> save button here </div> : null}
            {getBody(
              props.ssr,
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
        </Center>

        <></>
      </>
    );
  } else {
    // client only
    const [{ data, fetching }] = useMeQuery();
    const [links, setLinks] = useState([]);

    useEffect(() => {
      console.log("THE LOADED DATA IS", data);
      if (data?.me?.user?.links) {
        setLinks(data?.me?.user?.links);
      }
    }, [data]);

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
                props.ssr,
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
      </>
    );
  }
};

export async function getServerSideProps(context) {
  const { res, req } = context;
  const rawCookie = req.headers.cookie;

  // parse cookie

  const parsedCookie = parseCookie(req.headers.cookie || "");

  // if the HTTP only cookie is available, then we can render server side log in with server side props
  if (parsedCookie[process.env.COOKIE_NAME || "link:id"]) {
  } else {
    // if the HTTP only cookie is not available, we need to redirect them
    res.writeHead(301, { location: "/" });
    return res.end();
  }

  // we only get here if there is a named  httpOnly cookie with the `key` of `link:id`
  // if someone fakes the cookie, we can rely on the session validation logic on our graphql server
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: process.env.GRAPHQL_URL || "http://localhost:3001/graphql",
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
      fetchOptions: {
        headers: {
          Cookie: rawCookie,
        },
      },
    },
    false
  );

  // This query is used to populate the cache for the query
  // used on this page.
  // TODO: figure out how to store these queries in a different file
  await client
    .query(
      `query Me {
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

  console.log("serialized is", serialized);

  return {
    props: {
      ssr: { ...serialized },
    },
  };
}

export default Profile;
