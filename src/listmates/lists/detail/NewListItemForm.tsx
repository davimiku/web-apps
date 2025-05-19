"use client";

import { ListDetailRecord } from "../actions/db";
import { createListItemAction } from "../actions/server";

export type NewListItemFormProps = {
  list: ListDetailRecord;
};

export function NewListItemForm({ list }: NewListItemFormProps) {
  function action(formData: FormData) {
    void createListItemAction(list.id, formData);
  }

  return (
    <form action={action}>
      <div className="grid-container halves">
        <div>
          <label htmlFor="description">
            <span className="label-body">New List Item</span>
          </label>
          <input type="text" className="u-full-width" id="description" name="description" autoComplete="off" required />
        </div>

        <div>
          <button className="u-full-width">Add item</button>
        </div>
      </div>
    </form>
  );
}
