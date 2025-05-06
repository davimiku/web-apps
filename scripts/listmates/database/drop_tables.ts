import { db } from "../../../src/database/database";

void (async function () {
  await db.schema.dropTable("listmates.list_item").ifExists().execute();
  await db.schema.dropTable("listmates.list").ifExists().execute();
  await db.destroy();
})();
