import {
  PrimaryKey,
  Entity,
  Property,
  Collection,
  OneToMany,
} from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";
import { Link } from "./Link";

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

  // delete user's links when user is deleted
  @OneToMany(() => Link, (link) => link.user)
  @Field(() => [Link])
  links = new Collection<Link>(this);
}
