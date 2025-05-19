"use client";

import { List } from "../tables";

export function ListsTable({ lists }: { lists: List[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Item</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {lists.map((list) => (
          <tr key={list.id}>
            <td>
              <a href={list.id}>
                <span>{list.name}</span>
              </a>
            </td>
            <td>
              <ul>
                <li>
                  <span>{list.description}</span>
                </li>
              </ul>
            </td>
            <td>
              <a className="button" href={`${list.id}/edit}`}>
                Edit Configuration
              </a>
              <a className="button" href={`${list.id}/archive`}>
                Archive
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
