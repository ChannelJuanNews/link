// import our environment variables
import * as dotenv from "dotenv";
dotenv.config();

//
import "reflect-metadata";
// import our ORM
import { MikroORM } from "@mikro-orm/core";
//import { User } from "./entities/user";
import mikro_config from "./mikro-orm.config";
import express from "express";
// import our graphql endpoints
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
// resolvers for our our graphql queries
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
// loggers for io
import { LOGGER, ERROR } from "./util/logger";

import redis from "redis";
import session from "express-session";
import store from "connect-redis";

//const WARN = LOGGER.extend("WARN");
const PORT = process.env.PORT! || 3000;

// main function for running our backend
const main = async () => {
  // connect to the database and configure it with our config file
  const orm = await MikroORM.init(mikro_config);
  // create and run our migrations on connection
  await orm.getMigrator().up();

  LOGGER("Main function called");

  // instantiate our express applicaiton
  const app = express();

  // connect our sesssion middleware
  const RedisStore = store(session);
  const RedisClient = redis.createClient();

  // session middleware that uses redis to store our server-side sessions
  app.use(
    session({
      store: new RedisStore({ client: RedisClient }),
      secret: process.env.REDIS_SECRET || "randomsecretgoeshere",
      saveUninitialized: true,
      resave: false,
    })
  );

  // instantiate our graphql library
  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, HelloResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  apollo.applyMiddleware({ app });

  app
    .listen(PORT, () => {
      // mixpanel insert event here
    })
    .addListener("listening", () => {
      LOGGER(`Server running on port ${PORT}`);
    })
    .addListener("error", (err) => {
      ERROR(err);
    })
    .addListener("connection", () => {
      LOGGER("Client Connected");
    })
    .addListener("close", () => {
      // mixpanel insert event here
    });
};

main().catch((err) => {
  LOGGER(err);
});
