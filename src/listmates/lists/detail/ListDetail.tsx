"use server-entry";

import "../../../client";
import { Layout } from "../../../Layout";
import { readListAction } from "../actions/server";
import { ListTodoItem } from "./ListDetailItem";
import { NewListItemForm } from "./NewListItemForm";

export async function ListDetail({ id }: { id: string }) {
  const list = await readListAction(id);
  if (!list) {
    return <p>No list found!</p>;
  }

  return (
    <Layout title={"Listmates | " + list.name} description={"Detail page for list " + list.name}>
      <>
        <h1>{list.name}</h1>
        <p>{list.description}</p>

        <table className="u-full-width" style={{ display: list.items.length ? "" : "none" }}>
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* TODO - another component for Row that picks the kind of row (Todo, status) */}
            {list.items.map((item, index) => (
              <ListTodoItem key={item.id} {...item} index={index + 1} />
            ))}
          </tbody>
        </table>

        <NewListItemForm list={list} />
      </>
    </Layout>
  );
}
