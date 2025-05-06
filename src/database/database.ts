import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { ListItemTable, ListTable } from "../listmates/table.ts";

export const randomId = () =>
  Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    .toString()
    .padStart(16, "0");

const pool = new Pool({
  host: "localhost",
  database: "web-apps",
  user: "davidmikulis",
  // port: 5434,
  max: 10,
});

const dialect = new PostgresDialect({
  pool,
});

export const db = new Kysely<Database>({
  dialect,
});

export type Database = {
  "listmates.list": ListTable;
  "listmates.list_item": ListItemTable;
};
