import { IDatabaseDriver, Connection, EntityManager } from "mikro-orm";

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};
