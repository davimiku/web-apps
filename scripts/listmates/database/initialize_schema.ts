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

    /**
     * Adds 'id' column as a Primary Key, auto-generated UUID
     */
    addPrimaryKeyUuid(): this;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
(CreateTableBuilder as any).prototype.addDateColumns = function <TB extends string, C extends string = never>(
  this: CreateTableBuilder<TB, C>
) {
  return this.addColumn("created_at", "timestamp", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("archived_at", "timestamp")
    .addColumn("deleted_at", "timestamp");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
(CreateTableBuilder as any).prototype.addPrimaryKeyUuid = function <TB extends string, C extends string = never>(
  this: CreateTableBuilder<TB, C>
) {
  return this.addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`));
};

void (async function () {
  await db.schema.createSchema("listmates").ifNotExists().execute();

  await db.schema
    .createTable("listmates.list")
    .ifNotExists()
    .addPrimaryKeyUuid()
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("description", "varchar")
    .addDateColumns()
    .execute();

  await db.schema
    .createTable("listmates.list_item")
    .ifNotExists()
    .addPrimaryKeyUuid()
    .addColumn("list_id", "uuid", (col) => col.references("listmates.list.id").onDelete("cascade"))
    .addColumn("description", "varchar(255)", (col) => col.notNull())
    .addColumn("is_completed", "boolean")
    .addColumn("status", "varchar(4)")
    .addColumn("inserted_index", "bigserial")
    .addDateColumns()
    .execute();

  await db.schema.alterTable("listmates.list_item").addColumn("inserted_index", "bigserial").execute();

  await db.destroy();
})();
