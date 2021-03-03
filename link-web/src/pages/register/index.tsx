import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
  Flex,
  Spacer,
  Link,
  Text,
} from "@chakra-ui/react";

import { Formik, Form } from "formik";

import Wrapper from "../../components/Wrapper";
import InputField from "../../components/InputField";

import NextLink from "next/link";

import { useMutation, useQuery } from "urql";

import { useRouter } from "next/router";

import {
  useRegisterMutation,
  useUsernameExistsQuery,
  useEmailExistsQuery,
} from "../../generated/graphql";

import validateEmail from "../../util/validateEmail";
import processRegisterErrors from "../../util/processRegisterErrors";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [
    { fetching, data, error, extensions, operation },
    register,
  ] = useRegisterMutation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [emailResult, checkEmail] = useEmailExistsQuery();
  const [usernameResult, checkUsername] = useUsernameExistsQuery();

  const [userTaken, setUserTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  const router = useRouter();

  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          //console.log(values, email, username, password);
          const response = await register({ username : username, email : email, password : password});
          if (response.data?.registerUser.error) {
            const errors = processRegisterErrors(
              response.data?.registerUser.error
            );
            console.log("the returned errors are", errors);
            setErrors(errors);
          } else {
            router.push("/profile");
          }
        }}
      >
        {({ values, handleChange, isSubmitting, resetForm, setFieldValue }) => (
          <>
            <Box m={8}>
              <Text fontSize={"5xl"}> Register </Text>
            </Box>
            <Form
              onKeyUp={(e) => {
                //console.log("we are here");
              }}
              onChange={async (e: any) => {
                switch (e.target.name) {
                  case "email":
                    if (validateEmail(e.target?.value)) {
                      //console.log("email value is", e.target.value);
                      const result = await checkEmail();

                      console.log("THE RESULT IS", result);
                    }

                    //checkEmail(e.target.value);
                    break;
                  case "username":
                  //checkUsername(e.target.value);
                  default:
                    return;
                }
                //console.log(e.target.name);
              }}
            >
              <Box m={8}>
                <InputField
                  name="email"
                  placeholder="email@email.com"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
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
                    Register{" "}
                  </Button>
                  <Spacer />
                  <NextLink href="/login">
                    <Link my={5}>
                      {" "}
                      <Text> Already have an account?</Text>
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

export default Register;
