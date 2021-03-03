import { Icon } from "@chakra-ui/icons";

function HamburgerIcon() {
  return (
    <Icon>
      <svg viewBox="0 0 200 200" width="40" height="40" fill="#FAFAFA">
        <rect width="200" height="20"></rect>
        <rect y="40" width="200" height="20"></rect>
        <rect y="80" width="200" height="20"></rect>
      </svg>
      ;
    </Icon>
  );
}

export default HamburgerIcon;
