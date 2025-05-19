import { jsonArrayFrom } from "kysely/helpers/postgres";
import { db } from "../../../database/database";
import { List, ListInsert, ListItemInsert, ListUpdate } from "../../tables";

export async function selectAllLists(): Promise<List[]> {
  return await db.selectFrom("listmates.list").where("listmates.list.archived_at", "is", null).selectAll().execute();
}

export async function selectArchivedLists(): Promise<List[]> {
  return await db
    .selectFrom("listmates.list")
    .where("listmates.list.archived_at", "is not", null)
    .selectAll()
    .execute();
}

export async function selectDeletedLists(): Promise<List[]> {
  return await db.selectFrom("listmates.list").where("listmates.list.deleted_at", "is not", null).selectAll().execute();
}

export type ListDetailRecord = {
  name: string;
  description: string | null;
  id: string;
  created_at: Date;
  updated_at: Date;
  archived_at: Date | null;
  deleted_at: Date | null;
  items: {
    id: string;
    description: string;
    status: string | null;
    isCompleted: boolean | null;
    insertedIndex: number;
  }[];
};

export type ListDetailItemRecord = ListDetailRecord["items"][number];

export async function selectList(id: string): Promise<ListDetailRecord | null> {
  const query = db
    .selectFrom("listmates.list")
    .selectAll("listmates.list")
    .where("listmates.list.id", "=", id)
    .select((eb) => [
      jsonArrayFrom(
        eb
          .selectFrom("listmates.list_item")
          .select([
            "listmates.list_item.id",
            "listmates.list_item.description",
            "listmates.list_item.status",
            "listmates.list_item.is_completed as isCompleted",
            "listmates.list_item.inserted_index as insertedIndex",
          ])
          .whereRef("listmates.list_item.list_id", "=", "listmates.list.id")
          .orderBy("listmates.list_item.inserted_index", "asc")
      ).as("items"),
    ]);
  return (await query.executeTakeFirst()) ?? null;
}

export async function insertList(newList: ListInsert): Promise<{ id: string }> {
  return await db.insertInto("listmates.list").values(newList).returning(["id"]).executeTakeFirstOrThrow();
}

export async function insertListItem(newListItem: ListItemInsert): Promise<{ id: string }> {
  return await db.insertInto("listmates.list_item").values(newListItem).returning(["id"]).executeTakeFirstOrThrow();
}

export async function toggleListItemCompleted(listItemId: string) {
  return await db
    .updateTable("listmates.list_item")
    .where("id", "=", listItemId)
    .set((eb) => ({ is_completed: eb.unary("not", "is_completed") }))
    .execute();
}

export async function deleteListItem(listItemId: string) {
  return await db.deleteFrom("listmates.list_item").where("id", "=", listItemId).execute();
}

export async function updateList(id: string, listUpdate: ListUpdate) {
  return await db
    .updateTable("listmates.list")
    .set({ ...listUpdate, updated_at: new Date() })
    .where("listmates.list.id", "=", id)
    .executeTakeFirstOrThrow();
}
