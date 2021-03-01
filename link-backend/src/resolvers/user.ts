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

import { EntityManager } from "@mikro-orm/postgresql";

import argon2 from "argon2";

import validateEmail from "../util/validateEmail";
import caseInsensitive from "../util/caseInsensitive";

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

  @Field(() => Boolean, { nullable: true })
  exists?: Boolean;
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
          code: 20,
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

  // check if email exists
  @Query(() => UserResponse)
  async emailExists(
    @Ctx() { em }: MyContext,
    @Arg("email") email: string
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { email: caseInsensitive(email) });
    if (user)
      return {
        exists: true,
      };
    return {
      exists: false,
    };
  }

  // check if username exists
  @Query(() => UserResponse)
  async usernameExists(
    @Ctx() { em }: MyContext,
    @Arg("username") username: string
  ): Promise<UserResponse> {
    const user = await em.findOne(User, {
      username: caseInsensitive(username),
    });
    if (user)
      return {
        exists: true,
      };
    return {
      exists: false,
    };
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
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    // make sure that the email is valid
    if (validateEmail(email)) {
      const hashed = await argon2.hash(password);

      try {
        const result = await (em as EntityManager)
          .createQueryBuilder(User)
          .getKnexQuery()
          .insert({
            email: email,
            username: username,
            password: hashed,
            created_at: new Date(),
            updated_at: new Date(),
          })
          .returning("*");

        if (result.length < 1)
          throw new Error("Failed to insert new user into database (register)");

        if (result.length > 1)
          throw new Error(
            "Query returned more than 1 newly reigstered user (register)"
          );

        // cast the result as type User
        const newUser: User = result[0];
        // TODO: log to mixpanel that a new user has been created
        /* 
        const newUser = await em.create(User, {
          email,
          username,
          password: hashed,
        }); */

        //await em.persistAndFlush(newUser[0]);

        req.session!.userId = newUser.id;
        LOGGER("NEW USER REGISTERED & LOGGED IN ", newUser);

        return {
          user: newUser,
        };
      } catch (e) {
        switch (String(e.code)) {
          case "23505":
            LOGGER("DUPLICATE ERROR:", e?.constraint);
            if (String(e?.constraint) == "user_email_unique") {
              return {
                error: {
                  message: `Email is already taken`,
                  code: 42,
                },
              };
            } else if (String(e?.constraint) == "user_username_unique") {
              return {
                error: {
                  message: `Email is already taken`,
                  code: 39,
                },
              };
            } else {
              return {
                error: {
                  message: "Error authenticating",
                  code: 35,
                },
              };
            }
            break;
          default:
            LOGGER("GENERIC ERROR: FAILED TO REGISTER USER");
            return {
              error: {
                message: "Error authenticating",
                code: 35,
              },
            };
        }
      }
    } else {
      ERROR("ERROR CANNOT VALIDATE EMAIL => ", email);
      return {
        error: {
          message: "Please provide a valid email",
          code: 41,
        },
      };
    }
  }

  // log a user in
  @Mutation(() => UserResponse)
  async login(
    @Arg("email", { nullable: true }) email: string,
    @Arg("username", { nullable: true }) username: string,
    @Arg("password") password: string,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (!!username && !!email) {
      return {
        error: {
          message: "Please include a username or password",
          code: 30,
        },
      };
    }

    const user = await em.findOne(User, {
      $or: [
        { email: caseInsensitive(email) },
        { username: caseInsensitive(username) },
      ],
    });

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
        code: 42,
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
