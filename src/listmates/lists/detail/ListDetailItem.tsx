"use client";

import { type ListDetailItemRecord } from "../actions/db";
import { deleteListItemAction, toggleListItemCompletedAction } from "../actions/server";

export type ListDetailItemProps = ListDetailItemRecord & { index: number };

export function ListTodoItem({ id, isCompleted, description, status, index }: ListDetailItemProps) {
  function toggleListItemCompleted() {
    void toggleListItemCompletedAction(id);
  }
  function deleteListItem() {
    void deleteListItemAction(id);
  }

  const toggleButton = isCompleted ? (
    <button className="icon completed" onClick={toggleListItemCompleted}>
      ✅
    </button>
  ) : (
    <button className="icon incomplete" onClick={toggleListItemCompleted}>
      🔲
    </button>
  );
  const descriptionCell = isCompleted ? <s>{description}</s> : <span>{description}</span>;

  return (
    <tr data-test-row-index={index}>
      <td>{toggleButton}</td>
      <td>{descriptionCell}</td>
      <td>
        <button className="icon" onClick={deleteListItem}>
          🗑️
        </button>
      </td>
    </tr>
  );
}
