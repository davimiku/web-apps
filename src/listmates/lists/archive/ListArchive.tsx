"use client";

import { deleteListAction } from "../actions/server";

export function ListArchive({ id }: { id: string }) {
  return (
    <form action={deleteListAction.bind(null, id)}>
      <h2>Are you sure you want to Archive this list?</h2>
      <button type="submit">Archive</button>
      <a href="..">Cancel</a>
    </form>
  );
}
