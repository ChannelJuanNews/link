import { IDatabaseDriver, Connection, EntityManager } from "mikro-orm";
import { Request, Response } from "express";

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;

  req: Request & { session?: any };
  res: Response;
};
