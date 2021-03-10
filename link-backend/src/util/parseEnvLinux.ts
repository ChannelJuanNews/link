import fs from "fs";
import path from "path";
import dotenv from "dotenv";

export default function () {
  const buffer = fs.readFileSync(path.resolve(__dirname, "/../../.env"));
  const result = dotenv.parse(buffer);
  process.env = { ...process.env, ...result };
}
