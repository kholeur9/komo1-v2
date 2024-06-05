import { db } from "@/db";
import { users } from "@/schema";
import { eq } from "drizzle-orm";

export const getUserByNumber = (number: string) => {
  return db.query.users.findFirst({
    where: eq(users.number, number),
  })
}