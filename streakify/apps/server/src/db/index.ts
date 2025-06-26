
import { drizzle } from "drizzle-orm/libsql";
import { env } from "cloudflare:workers";
import { createClient } from "@libsql/client";

const client = createClient({
  url: env.DATABASE_URL || "",
  authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle({ client });
