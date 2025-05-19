"use server";

import { isUuid } from "../../../database/uuid";
import { List } from "../../tables";
import * as db from "./db";

export async function readListsAction(): Promise<List[]> {
  const lists = await db.selectAllLists();
  return lists;
}

export async function readListAction(id: string) {
  if (isUuid(id)) {
    return await db.selectList(id);
  }
  return null;
}

export async function createListAction(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string | null;
  await db.insertList({ name, description });
}

export async function createListItemAction(listId: string, formData: FormData) {
  const description = formData.get("description") as string;
  if (isUuid(listId)) {
    await db.insertListItem({ description, list_id: listId, is_completed: false });
  }
}

export async function toggleListItemCompletedAction(listItemId: string) {
  if (isUuid(listItemId)) {
    await db.toggleListItemCompleted(listItemId);
  }
}

export async function deleteListItemAction(listItemId: string) {
  if (isUuid(listItemId)) {
    await db.deleteListItem(listItemId);
  }
}

export async function updateListAction(id: string, { name, description }: { name?: string; description?: string }) {
  if (isUuid(id)) {
    await db.updateList(id, { name, description });
  }
}

export async function archiveListAction(id: string) {
  if (isUuid(id)) {
    await db.updateList(id, { archived_at: new Date() });
  }
}

export async function deleteListAction(id: string) {
  if (isUuid(id)) {
    await db.updateList(id, { deleted_at: new Date() });
  }
}
