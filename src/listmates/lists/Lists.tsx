"use server-entry";

import { Layout } from "../../Layout";
import "../../client";
import { ListsTable } from "./ListsTable";
import { createListAction, readListsAction } from "./actions/server";

export async function Lists() {
  const lists = await readListsAction();
  return (
    <Layout title="Listmates | Lists" baseHref="/listmates/lists/" description="Listmates - all lists">
      <h1>Lists</h1>
      <a href="..">Listmates</a>
      <ListsTable lists={lists} />
      <form action={createListAction}>
        <fieldset>
          <legend>Create New List</legend>
          <label>
            <span>Name</span>
            <input required maxLength={255} name="name" />
          </label>
          <label>
            <span>Description</span>
            <input name="description" />
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </Layout>
  );
}
