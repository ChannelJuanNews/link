import React, { InputHTMLAttributes, useState } from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useField } from "formik";

import { AtSignIcon, CheckIcon, ViewIcon, CloseIcon } from "@chakra-ui/icons";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: String;
  label: String;
  placeholder?: String;
  setFieldValue?: Function;
};

const InputField: React.FC<InputFieldProps> = ({ size: _, ...props }) => {
  const [field, { error }] = useField(props);
  const [toggle, setToggle] = useState(false);

  // make the queries at the state
  //console.log(props);

  // username field
  if (props.name === "username") {
    return (
      <FormControl
        isInvalid={!!error}
        onKeyUp={(e) => {
          //console.log("we are here formcontrol (username)", e);
        }}
      >
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
        <InputGroup>
          <InputLeftAddon bgColor="linkedin.500" children={<AtSignIcon />} />
          <Input {...field} {...props} />

          {error ? (
            <InputRightElement
              children={
                error ? (
                  <CloseIcon
                    onClick={(e) => {
                      props.setFieldValue("username", "");
                    }}
                  />
                ) : (
                  <CheckIcon color="green.500" />
                )
              }
            />
          ) : null}
        </InputGroup>

        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    );
  }

  //console.log(props.name);

  if (props.name === "password") {
    return (
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
        <InputGroup>
          <Input {...field} {...props} type={toggle ? "text" : "password"} />
          <InputRightElement
            onClick={(e) => setToggle(!toggle)}
            children={
              <IconButton
                arai-label="toggle-pass"
                bgColor="linkedin.500"
                icon={<ViewIcon outline="none" borderStyle="none" />}
              />
            }
          />
        </InputGroup>

        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    );
  }

  return (
    <FormControl
      isInvalid={!!error}
      onKeyUp={(e) => {
        //console.log("we are here formcontrol", e);
      }}
      onSubmit={(e) => console.log("submit mail", e)}
    >
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Input {...field} {...props} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
