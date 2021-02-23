import { User } from "../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";

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

  // create user
  @Mutation(() => User)
  async createUser(
    @Arg("name") name: string,
    @Ctx() { em }: MyContext
  ): Promise<User> {
    const newUser = await em.create(User, { name });
    await em.persistAndFlush(newUser);
    return newUser;
  }

  // update user by id
  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: number,
    @Arg("name", () => String, { nullable: true }) name: string,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    const user = await em.findOne(User, { id });
    if (!user) {
      return null;
    }
    if (typeof name !== undefined) {
      user.name = name;
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
