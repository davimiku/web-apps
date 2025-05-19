import { Generated, GeneratedAlways } from "kysely";

export type GeneratedDates = {
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
  archived_at: Date | null;
  deleted_at: Date | null;
};

export type GeneratedId = {
  id: GeneratedAlways<string>;
};

export type Base = GeneratedId & GeneratedDates;
