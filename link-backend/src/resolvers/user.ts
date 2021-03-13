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

import { Link } from "../entities/Link";

import { LOGGER, ERROR } from "../util/logger";

import { EntityManager } from "@mikro-orm/postgresql";

import argon2 from "argon2";

import isValidUrl from "../util/isValidUrl";

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
class Success {
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

  @Field(() => Link, { nullable: true })
  link?: Link;

  @Field(() => Success, { nullable: true })
  success?: Success;

  @Field(() => Boolean, { nullable: true })
  exists?: Boolean;
}

@Resolver()
export class UserResolver {
  @Query(() => UserResponse)
  async me(@Ctx() { em, req }: MyContext): Promise<UserResponse> {
    LOGGER("PROFILE RESOLVER CALLED");
    if (!req?.session?.user_id) {
      LOGGER(
        "userid does not exist on our session storage, tell the user to login or register"
      );
      // mixpanel insertions here

      return {
        error: {
          message: "Unauthorized, failed to fetch user profile",
          code: 20,
        },
      };
    }

    const u = await em.findOne(User, { id: req.session.user_id });

    if (u) {
      const user = await em.populate(u, ["links"]);

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
    LOGGER("USERS RESOLVER CALLED");
    return em.find(User, {});
  }

  // check if email exists
  @Query(() => UserResponse)
  async emailExists(
    @Ctx() { em }: MyContext,
    @Arg("email") email: string
  ): Promise<UserResponse> {
    LOGGER("EMAIL EXISTS RESOLVER CALLED");
    const user = await em.findOne(User, { email: caseInsensitive(email) });
    if (user) {
      return {
        exists: true,
      };
    }

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
    LOGGER("USERNAME EXISTS RESOLVER CALLED");
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
    LOGGER("USER RESOLVER CALLED");
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
    LOGGER("REGISTER USER RESOLVER CALLED");
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

        req.session!.user_id = newUser.id;
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
      ERROR("ERROR CANNOT VALIDATE EMAIL => ", email, email.length);
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
    LOGGER("LOGIN RESOLVER CALLED");
    // if no username or email is present, throw an error
    if (!username && !email) {
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
        req.session!.user_id = user.id;
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

  @Mutation(() => UserResponse)
  async logout(@Ctx() { req }: MyContext): Promise<UserResponse> {
    LOGGER("LOGOUT RESOLVER CALLED");
    // TODO: break logout function out into its own utility function
    const logout = () => {
      try {
        return new Promise((resolve, reject) => {
          req.session.destroy((err) => {
            if (err) {
              return reject(err);
            }
            return resolve(true);
          });
        });
      } catch (e) {
        // TODO:
        // log event with mixpanel
        LOGGER("ERROR LOGGING OUT", e);
        return {
          error: {
            message: "Failed to log user out",
            code: 70,
          },
        };
      }
    };

    const result = await logout();

    if (result) {
      return { success: { message: "Successfully logged out", code: 10 } };
    }

    // default return a success message
    return {
      error: {
        message: "Failed to log user out",
        code: 70,
      },
    };
  }

  @Mutation(() => UserResponse)
  async addLink(
    @Arg("url") url: string,
    @Arg("title") title: string,
    @Arg("icon", { nullable: true }) icon: string = "",
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    LOGGER("ADD LINK RESOLVER CALLED");
    if (isValidUrl(url)) {
      const user = await em.findOne(User, { id: req.session.user_id });
      if (user) {
        // this is the business logic
        // if we

        try {
          // create the new link
          const newLink = await em.create(Link, {
            url: url,
            user: user,
            title: title,
            icon: icon,
          });
          // save the new linnk
          await em.persistAndFlush(newLink);
          // add the reference id to the user table
          user.links.add(newLink);

          await em.persistAndFlush(user);

          return {
            link: newLink,
          };
        } catch (e) {
          console.log(e);
          switch (e.code) {
            case "23505":
              return {
                error: {
                  message:
                    "Cannot add duplicate links, please provide a unique URL",
                  code: 90,
                },
              };
              break;
            default:
              // throw a generic error
              return {
                error: {
                  message:
                    "Failed to create link, make sure you provided both a valid url and a title",
                  code: 90,
                },
              };
          }
        }
      }
      return {
        error: {
          message: "Unauthorized",
          code: 50,
        },
      };
    } else {
      return {
        error: {
          message: `URL Validation Error: ${url} is not a valid URL`,
          code: 42,
        },
      };
    }
  }

  // update user by id
  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: number,
    @Arg("email", () => String, { nullable: true }) email: string,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    LOGGER("UPDATE USER RESOLVER CALLED");
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
    LOGGER("DELETE USER RESOLVER CALLED");
    try {
      await em.nativeDelete(User, { id });
      return true;
    } catch (e) {
      return false;
    }
  }
}
