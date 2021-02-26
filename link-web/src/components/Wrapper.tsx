import { Box } from "@chakra-ui/react";

interface WrapperProps {
  variant?: "small" | "regular";
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant = "regular" }) => {
  return (
    <Box
      m={8}
      mx={"auto"}
      maxW={variant === "regular" ? "800px" : "300px"}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
