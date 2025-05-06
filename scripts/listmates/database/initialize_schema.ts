import { db } from "../../../src/database/database";

import { CreateTableBuilder, sql } from "kysely";

declare module "kysely" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface CreateTableBuilder<TB extends string, C extends string = never> {
    /**
     * Adds 'timestamp' columns:
     * - `created_at` (not-null, default now())
     * - `updated_at` (not-null, default now())
     * - `deleted_at`
     */
    addDateColumns(): this;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
(CreateTableBuilder as any).prototype.addDateColumns = function <TB extends string, C extends string = never>(
  this: CreateTableBuilder<TB, C>
) {
  return this.addColumn("created_at", "timestamp", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("deleted_at", "timestamp");
};

void (async function () {
  await db.schema.createSchema("listmates").ifNotExists().execute();

  await db.schema
    .createTable("listmates.list")
    .ifNotExists()
    .addColumn("id", "bigint", (col) => col.generatedAlwaysAsIdentity().primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("description", "varchar")
    .addDateColumns()
    .execute();

  await db.schema
    .createTable("listmates.list_item")
    .ifNotExists()
    .addColumn("id", "bigint", (col) => col.generatedAlwaysAsIdentity().primaryKey())
    .addColumn("list_id", "bigint", (col) => col.references("listmates.list.id").onDelete("cascade"))
    .addColumn("description", "varchar", (col) => col.notNull())
    .addColumn("status", "varchar(4)")
    .addDateColumns()
    .execute();

  // await db.schema.createTable("listmates.user_list");

  await db.destroy();
})();
