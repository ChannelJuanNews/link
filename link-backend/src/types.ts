import { IDatabaseDriver, Connection, EntityManager } from "mikro-orm";
import { Request, Response } from "express";
import { SessionData } from "express-session";

interface MySessionData extends SessionData {
  user_id?: number;
}

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;

  req: Request & { session?: MySessionData };
  res: Response;
};
