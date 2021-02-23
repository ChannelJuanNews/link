import { PrimaryKey, Entity, Property } from "@mikro-orm/core";

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ nullable: true })
  hash?: string = "password";

  @Property({ type: "date" })
  created_at = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updated_at = new Date();
}
