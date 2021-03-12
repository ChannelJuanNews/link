import fs from "fs";
import path from "path";
import dotenv from "dotenv";

function parseEnvLinux() {
  const buffer = fs.readFileSync(path.resolve(__dirname, "/../../.env"));
  const result = dotenv.parse(buffer);
  process.env = { ...process.env, ...result };
}

export default parseEnvLinux;
