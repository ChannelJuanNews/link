import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "../types";

import { LOGGER, ERROR } from "../util/logger";

import argon2 from "argon2";

import validateEmail from "../util/validateEmail";

@ObjectType()
class UserError {
  @Field()
  message!: String;

  @Field()
  code!: number;
}

@ObjectType()
class UserResponse {
  @Field(() => UserError, { nullable: true })
  error?: UserError;

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => UserResponse)
  async me(@Ctx() { em, req }: MyContext): Promise<UserResponse> {
    if (!req.session.userId) {
      console.log("no user id exists");
      // mixpanel insertions here
      return {
        error: {
          message: "Unauthorized, failed to fetch user profile",
          code: 40,
        },
      };
    }

    const user = await em.findOne(User, { id: req.session.userId });

    if (user) {
      return {
        user: user,
      };
    } else {
      return {
        error: {
          message: "Failed to get user profile",
          code: 44, // error code to set that the user is authorized but failed to retrieve the user profile
        },
      };
    }
  }

  // get all users
  @Query(() => [User])
  users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {});
  }

  // get user by id
  @Query(() => User, { nullable: true })
  user(@Arg("id") id: number, @Ctx() { em }: MyContext): Promise<User | null> {
    return em.findOne(User, { id });
  }

  // create/register user
  @Mutation(() => UserResponse, { nullable: true })
  async registerUser(
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    // make sure that the email is valid
    if (validateEmail(email)) {
      const hashed = await argon2.hash(password);

      try {
        const newUser = await em.create(User, {
          email,
          username,
          password: hashed,
        });

        await em.persistAndFlush(newUser);
        LOGGER("NEW USER CREATED");
        return {
          user: newUser,
        };
      } catch (e) {
        switch (String(e.code)) {
          case "23505":
            LOGGER("DUPLICATE KEY ERROR");
            return {
              error: {
                message: "Username is already taken",
                code: 40,
              },
            };
            break;
          default:
            return {
              error: {
                message: "Error authenticating",
                code: 40,
              },
            };
        }
      }
    } else {
      ERROR("ERROR CANNOT VALIDATE EMAIL => ", email);
      return {
        error: {
          message: "Please provide a valid email",
          code: 40,
        },
      };
    }
  }

  // log a user in
  @Mutation(() => UserResponse)
  async login(
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { $or: [{ email }, { username }] });

    if (user) {
      const verified = argon2.verify(user.password, password);
      if (verified) {
        req.session!.userId = user.id;
        return {
          user: user,
        };
      }
    }

    return {
      error: {
        message:
          "Please provide a valid username or email and correct password",
        code: 40,
      },
    };
  }

  // update user by id
  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: number,
    @Arg("email", () => String, { nullable: true }) email: string,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    const user = await em.findOne(User, { id });
    if (!user) {
      return null;
    }
    if (typeof email !== undefined) {
      user.email = email;
      await em.persistAndFlush(user);
    }

    return user;
  }

  // delete user by id
  @Mutation(() => Boolean)
  async deleteUser(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(User, { id });
      return true;
    } catch (e) {
      return false;
    }
  }
}
