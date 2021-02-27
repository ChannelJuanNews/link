import { PrimaryKey, Entity, Property } from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
/* 
@Filter({
  name: "containsEmail",
  cond: (args) => ({ email: args.email }),
})
@Filter({
  name: "containsUsername",
  cond: (args) => ({ username: args.username }),
})*/
export class User {
  // id
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  // email
  @Field(() => String)
  @Property({ unique: true })
  email!: string;

  @Field()
  @Property({ type: "text", unique: true })
  username!: string;

  // hash/password
  @Property({ type: "text" })
  password!: string;

  // created at
  @Field(() => String)
  @Property({ type: "date" })
  created_at = new Date();

  // updated at
  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updated_at = new Date();
}
