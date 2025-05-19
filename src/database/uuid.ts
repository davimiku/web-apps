import { RawBuilder, sql } from "kysely";
import crypto from "node:crypto";

// export type UUID = string & { [$uuid]: true };
// declare const $uuid: unique symbol;

const uuidFormat = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

export function isUuid(value: unknown): boolean {
  return typeof value === "string" && uuidFormat.test(value);
}

export function createUuid() {
  return crypto.randomUUID();
}

export function asUuid(val: string): RawBuilder<string> {
  return sql<string>`${val}::uuid`;
}
