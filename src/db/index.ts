import * as schema from "@/schema";
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
} else {
  console.log('DATABASE_URL is defined');
}

const pool = postgres(process.env.DATABASE_URL!)

export const db = drizzle(pool, { schema });