import React, { InputHTMLAttributes } from "react";

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
  name: string;
  label: string;
  placeholder?: string;
};

const InputField: React.FC<InputFieldProps> = ({ size: _, ...props }) => {
  const [field, { error }] = useField(props);

  if (props.name === "username") {
    return (
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
        <InputGroup>
          <InputLeftAddon children={<AtSignIcon />} />
          <Input {...field} {...props} />

          {error ? (
            <InputRightElement
              children={error ? <CloseIcon /> : <CheckIcon color="green.500" />}
            />
          ) : null}
        </InputGroup>

        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    );
  }

  console.log(props.name);

  if (props.name === "password") {
    return (
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
        <InputGroup>
          <Input {...field} {...props} />
          <InputRightElement
            children={
              <IconButton arai-label="toggle-pass" icon={<ViewIcon />} />
            }
          />
        </InputGroup>

        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    );
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Input {...field} {...props} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
