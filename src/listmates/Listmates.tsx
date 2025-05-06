"use server-entry";

import "../base.css";
import "../client";
import { readLists } from "./lists/actions/server";

export async function Listmates() {
  const lists = await readLists();
  return (
    <html>
      <head>
        <title>Lists</title>
        <base href="/listmates/"></base>
      </head>
      <body>
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
      </body>
    </html>
  );
}
