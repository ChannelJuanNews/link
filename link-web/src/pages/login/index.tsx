import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";

import { Formik, Form } from "formik";

import Wrapper from "../../components/Wrapper";
import InputField from "../../components/InputField";

import { useMutation, useQuery } from "urql";

import { useRouter } from "next/router";

import {
  useCheckEmailExistsQuery,
  useCheckUsernameExistsQuery,
} from "../../generated/graphql";

import validateEmail from "../../util/validateEmail";
import processRegisterErrors from "../../util/processRegisterErrors";

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const [emailResult, checkEmail] = useCheckEmailExistsQuery();
  const [usernameResult, checkUsername] = useCheckUsernameExistsQuery();

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
          console.log(values);
        }}
      >
        {({ values, handleChange, isSubmitting, resetForm, setFieldValue }) => (
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
                name="username"
                placeholder="username"
                label="Username"
                type="text"
                setFieldValue={setFieldValue}
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

export default Login;
