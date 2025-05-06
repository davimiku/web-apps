"use server-entry";

import "../../base.css";
import "../../client";
import { ListsTable } from "./ListsTable";
import { createList, readLists } from "./actions/server";

export async function Lists() {
  const lists = await readLists();
  return (
    <html>
      <head>
        <title>Lists</title>
        <base href="/listmates/lists/"></base>
      </head>
      <body>
        <h1>Lists</h1>
        <a href="..">Listmates</a>
        <ListsTable lists={lists} />
        <form action={createList}>
          <fieldset>
            <legend>Create New List</legend>
            <label>
              <span>Name</span>
              <input required name="name" />
            </label>
            <label>
              <span>Description</span>
              <input name="description" />
            </label>
            <button type="submit">Submit</button>
          </fieldset>
        </form>
      </body>
    </html>
  );
}
