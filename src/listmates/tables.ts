import { GeneratedAlways, Insertable, Selectable, Updateable } from "kysely";
import { Base } from "../database/generated";

export type ListTable = {
  name: string;
  description: string | null;
} & Base;

export type List = Selectable<ListTable>;
export type ListInsert = Insertable<ListTable>;
export type ListUpdate = Updateable<ListTable>;

export type ListItemTable = {
  list_id: string;
  description: string;
  status: string | null;
  is_completed: boolean | null;
  inserted_index: GeneratedAlways<number>;
} & Base;

export type ListItem = Selectable<ListItemTable>;
export type ListItemInsert = Insertable<ListItemTable>;
export type ListItemUpdate = Updateable<ListItemTable>;
