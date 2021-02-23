// import our environment variables
import * as dotenv from "dotenv";
dotenv.config();

// import our ORM
import { MikroORM } from "@mikro-orm/core";

import { User } from "./entities/user";

import mikro_config from "./mikro-orm.config";

// main function for running our backend
const main = async () => {
  const orm = await MikroORM.init(mikro_config);
  await orm.getMigrator().up();

  //const post = orm.em.create(User, { name: "Juan Ruelas " });
  //await orm.em.persistAndFlush(post);

  const posts = await orm.em.find(User, {});
  console.log(posts);
};

main().catch((err) => {
  console.log(err);
});

console.log("WE ARE HERE NOW");
