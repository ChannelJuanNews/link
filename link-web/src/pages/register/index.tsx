import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";

import { Formik, Form } from "formik";

import Wrapper from "../../components/Wrapper";
import InputField from "../../components/InputField";

import { useMutation, useQuery } from "urql";

import {
  useRegisterMutation,
  useCheckEmailExistsQuery,
  useCheckUsernameExistsQuery,
} from "../../generated/graphql";

import validateEmail from "../../util/validateEmail";
import processRegisterErrors from "../../util/processRegisterErrors";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [
    { fetching, data, error, extensions, operation },
    register,
  ] = useRegisterMutation();

  const [emailResult, checkEmail] = useCheckEmailExistsQuery();
  const [usernameResult, checkUsername] = useCheckUsernameExistsQuery();

  const [userTaken, setUserTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await register(values);
          if (response.data?.registerUser.error) {
            const errors = processRegisterErrors(
              response.data?.registerUser.error
            );
            console.log("the reutnred errors are", errors);
            setErrors(errors);
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form
            onKeyUp={(e) => {
              console.log("we are here");
            }}
            onChange={async (e: any) => {
              switch (e.target.name) {
                case "email":
                  if (validateEmail(e.target?.value)) {
                    console.log("email value is", e.target.value);
                    const result = await checkEmail({ email: e.target.value });
                    console.log(result);
                  }

                  //checkEmail(e.target.value);
                  break;
                case "username":
                //checkUsername(e.target.value);
                default:
                  return;
              }
              console.log(e.target.name);
            }}
          >
            <Box m={8}>
              <InputField
                name="email"
                placeholder="email@email.com"
                label="Email"
                type="email"
              />
            </Box>
            <Box m={8}>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
                type="text"
              />
            </Box>

            <Box m={8}>
              <InputField
                name="password"
                placeholder="*******"
                label="Password"
                type="password"
              />
            </Box>

            <Box mx="auto">
              <Button
                type="submit"
                isLoading={isSubmitting}
                colorScheme="linkedin"
              >
                {" "}
                Register{" "}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
