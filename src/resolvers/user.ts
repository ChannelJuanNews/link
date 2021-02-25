import { User } from "../entities/User";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";

import { LOGGER, ERROR } from "../util/logger";

import argon2 from "argon2";

import validateEmail from "../util/validateEmail";



@ObjectType()
class ErrorMessage {
    @Field(() => String , { nullable : true })
    message?:string 
    @Field(() => Number, { nullable : true })
    code?: number 
}

@ObjectType()
class UserResponse {
    @Field( () => ErrorMessage, { nullable : true })
    error? : ErrorMessage
    @Field(() => User, { nullable : true })
    user?: User
}



@Resolver()
export class UserResolver {
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
  @Mutation(() => User || Object, { nullable: true })
  async registerUser(
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { em }: MyContext
  ) {
    LOGGER("WE ARE HERE");
    // make sure that the email is valid
    if (validateEmail(email)) {
      LOGGER("WE ARE HERE, VALIDATED");
      const hashed = await argon2.hash(password);
      const newUser = await em.create(User, {
        email,
        username,
        password: hashed,
      });

      await em.persistAndFlush(newUser);
      return newUser;
    } else {
      ERROR("ERROR CANNOT VALIDATE EMAIL => ", email);
      return {
        error: true,
        error_message: "Please provide a valid email address",
      };
    }
  }

  // login user 
  @Mutation(() => UserResponse )
  async login(
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { em }: MyContext
  ) : Promise<UserResponse> {
    const  user = await em.findOne( User, { email : email, username : username  })

    if(!user) {

      
        return {
            error : {
                code : 40, 
                message: "Failed to find a user with the given username or email"
            }
        } 
    }


    const valid = argon2.verify( user.password, password)
    if(!valid){
              
        return {
            error : {
                code : 40, 
                message: "Incorrect password for given username or email"
            }
            
        } 

    } 

    return { user }

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
