import { User } from "./entities/User";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

const POSTGRES_USER = process.env.POSTGRES_USER! || "gerardo";
const POSTGRES_HOST = process.env.POSTGRES_HOST! || "localhost";
const POSTGRES_DB = process.env.POSTGRES_DB! || "link";
const POSTGRES_PASS = process.env.POSTGRES_PASS || "password";
const DEBUG = !process.env.PRODUCTION!;

export default {
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  password: POSTGRES_PASS,
  dbName: POSTGRES_DB,
  type: "postgresql",
  debug: DEBUG,
  entities: [User],
  migrations: {
    path: path.join(__dirname + "/migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
} as Parameters<typeof MikroORM.init>[0];
