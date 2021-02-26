import {
  PrimaryKey,
  Entity,
  Property,
  ManyToOne,
  IdentifiedReference,
} from "@mikro-orm/core";

import { ObjectType, Field, Int } from "type-graphql";

import { User } from "./User";

@ObjectType()
@Entity()
export class Link {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property()
  url!: string;

  @Field(() => String)
  @Property({ type: "date" })
  created_at = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updated_at = new Date();

  @ManyToOne(() => User, { wrappedReference: true, nullable: true })
  user?: IdentifiedReference<User>;
}
