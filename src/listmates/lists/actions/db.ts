"use server";

import { db } from "../../../database/database";
import { List, ListInsert, ListUpdate } from "../../table";

export async function selectAllLists(): Promise<List[]> {
  return await db.selectFrom("listmates.list").where("listmates.list.deleted_at", "is", null).selectAll().execute();
}

export async function selectDeletedLists(): Promise<List[]> {
  return await db.selectFrom("listmates.list").where("listmates.list.deleted_at", "is not", null).selectAll().execute();
}

export async function selectList(id: string): Promise<List | null> {
  const list =
    (await db
      .selectFrom("listmates.list")
      .selectAll()
      .where("listmates.list.id", "=", id)
      .innerJoin("listmates.list_item", "list_id", "listmates.list.id")
      .executeTakeFirst()) ?? null;
  return list;
}

export async function insertList(newList: ListInsert) {
  return await db.insertInto("listmates.list").values(newList).returning(["id"]).executeTakeFirstOrThrow();
}

export async function updateList(id: string, listUpdate: ListUpdate) {
  return await db
    .updateTable("listmates.list")
    .set({ ...listUpdate, updated_at: new Date() })
    .where("listmates.list.id", "=", id)
    .executeTakeFirstOrThrow();
}
