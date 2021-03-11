import { PrimaryKey, Entity, Property, ManyToOne } from "@mikro-orm/core";

import { ObjectType, Field, Int } from "type-graphql";

import { User } from "./User";

@ObjectType()
@Entity()
export class Link {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ unique: true })
  url!: string;

  @Field(() => String)
  @Property({ nullable: true })
  icon?: string;

  @Field(() => String)
  @Property({ nullable: false })
  title!: string;

  @Field(() => Number)
  @Property({ nullable: false })
  num_clicks: number = 0;

  @Field(() => Number)
  @Property({ nullable: true })
  num_views: number = 0;

  @Field(() => String)
  @Property({ type: "date" })
  created_at = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updated_at = new Date();

  @ManyToOne(() => User, { nullable: false })
  user!: User;

  constructor(url: string, user: User, icon?: string) {
    this.url = url;
    this.icon = icon;
    this.user = user;
  }
}
