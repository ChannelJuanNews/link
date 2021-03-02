import React from "react";

import { NextPage } from "next";
import { MeQuery, useMeQuery } from "../../generated/graphql";
import { NavBar } from "../../components/NavBar";

import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  WrapItem,
  Wrap,
  Spinner,
  Flex,
} from "@chakra-ui/react";

function getBody(data: MeQuery) {
  // if there is an error
  if (data.me.error) {
  }

  // if there is no user
  else if (!data.me.user) {
  }
  // if there is a user
  else if (data.me.user) {
    return (
      <>
        {" "}
        <Wrap>
          <WrapItem>
            <Avatar size="2xl" name={data.me.user.username.substr(0, 2)} />
          </WrapItem>
        </Wrap>{" "}
      </>
    );
  }
}

interface registerProps {}

const Profile: NextPage<registerProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();

  console.log("the data is", data, fetching);

  return (
    <>
      <NavBar profile={true} />

      <Flex>{fetching ? <Spinner /> : getBody(data)}</Flex>

      <></>
    </>
  );
};

export default Profile;
