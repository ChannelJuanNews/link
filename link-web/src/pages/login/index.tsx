import React, { useState } from "react";
import { Box, Button, Text, Link, Spacer, Flex } from "@chakra-ui/react";
import NextLink from "next/link";

import { Formik, Form } from "formik";

import Wrapper from "../../components/Wrapper";
import InputField from "../../components/InputField";

import { useMutation, useQuery } from "urql";

import { useRouter } from "next/router";

import validateEmail from "../../util/validateEmail";
import processRegisterErrors from "../../util/processRegisterErrors";

import {
  useLoginMutation,
  useUsernameExistsQuery,
  useEmailExistsQuery,
} from "../../generated/graphql";

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const [userTaken, setUserTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [{ fetching, data }, login] = useLoginMutation();

  const [_email, checkEmail] = useEmailExistsQuery();

  const router = useRouter();

  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await login({
            username: username,
            password: password,
          });

          if (response.data?.login.error) {
            return setErrors({ username: response.data.login.error.message });
          }
          router.push("/profile");
        }}
      >
        {({ values, handleChange, isSubmitting, resetForm, setFieldValue }) => (
          <>
            <Box m={8}>
              <Text fontSize={"5xl"}> Login </Text>
            </Box>

            <Form
              onKeyUp={(e) => {
                //console.log("we are here");
              }}
              onChange={async (e: any) => {
                switch (e.target.name) {
                  case "email":
                    if (validateEmail(e.target?.value)) {
                      const isValid = await checkEmail(e.target.value);
                      console.log("valid email", isValid);
                      //console.log("email value is", e.target.value);
                      //const result = await checkEmail();
                      //console.log("THE RESULT IS", result);
                    }

                    //checkEmail(e.target.value);
                    break;
                  case "username":
                    break;
                  //checkUsername(e.target.value);
                  default:
                    return;
                }
                //console.log(e.target.name);
              }}
            >
              <Box m={8}>
                <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Box>

              <Box m={8}>
                <InputField
                  name="password"
                  placeholder="*******"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>

              <Box mx="auto" m={8}>
                <Flex>
                  <Button
                    type="submit"
                    isLoading={fetching}
                    colorScheme="linkedin"
                  >
                    {" "}
                    Login{" "}
                  </Button>
                  <Spacer />
                  <NextLink href="/register">
                    <Link my={3}>
                      {" "}
                      <Text> Don't have an account?</Text>
                    </Link>
                  </NextLink>
                </Flex>
              </Box>
            </Form>
          </>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
