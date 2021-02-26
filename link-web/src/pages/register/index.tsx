import React from "react";
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

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
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
