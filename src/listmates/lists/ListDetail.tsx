"use server-entry";

import "../../base.css";
import "../../client";
import { readList } from "./actions/server";

export async function ListDetail({ id }: { id: string }) {
  const list = await readList(id);

  return <span>{list?.name}</span>;
}
