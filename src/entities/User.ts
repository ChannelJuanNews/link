import { PrimaryKey, Entity, Property } from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class User {
  // id
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  // name
  @Field(() => String)
  @Property()
  name!: string;

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
