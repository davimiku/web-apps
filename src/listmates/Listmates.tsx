"use server-entry";

import "../client";
import { Layout } from "../Layout";
import { readListsAction } from "./lists/actions/server";

export async function Listmates() {
  const lists = await readListsAction();
  return (
    <Layout title="Listmates" baseHref="/listmates/" description="Listmates application - manage lists of lists">
      <h1>Recent Lists</h1>
      <a href="/">Home</a>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <a href={`./lists/${list.id}/`}>
              <span>{list.name}</span>
              <span>{list.description}</span>
            </a>
          </li>
        ))}
      </ul>
      <ul>
        <li>
          <a href="lists/">All Lists</a>
        </li>
      </ul>
    </Layout>
  );
}
