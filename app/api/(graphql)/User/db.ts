import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const UserTable = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    name: text("name"),
    email: text("email").unique().notNull(),
    emailVerified: boolean("email_verified").default(false),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    userSearchNameIndex: index("user_search_name_index").using(
      "gin",
      sql`${table.name} gin_trgm_ops`,
    ),
    emailIdx: index("email_idx").on(table.email),
  }),
);

export type UserDBInsert = typeof UserTable.$inferInsert;
export type UserDB = typeof UserTable.$inferSelect;
