"use server";

import { List } from "../../table";
import * as db from "./db";

export async function readLists(): Promise<List[]> {
  const lists = await db.selectAllLists();
  return lists;
}

export async function readList(id: string): Promise<List | null> {
  return await db.selectList(id);
}

export async function createList(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string | null;
  await db.insertList({ name, description });
}

export async function updateList(id: string, formData: FormData) {
  const name = (formData.get("name") ?? undefined) as string | undefined;
  const description = (formData.get("description") ?? undefined) as string | undefined;
  await db.updateList(id, { name, description });
}

export async function updateList2(id: string, { name, description }: { name?: string; description?: string }) {
  await db.updateList(id, { name, description });
}

export async function deleteList(id: string) {
  await db.updateList(id, { deleted_at: new Date() });
}
