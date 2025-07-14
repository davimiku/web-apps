-- Add up migration script here
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS listmates.list (
  id UUID PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4 ()),
  name VARCHAR NOT NULL,
  description VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE
);


CREATE TABLE IF NOT EXISTS listmates.list_item (
  id UUID PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4 ()),
  list_id UUID REFERENCES listmates.list (id) NOT NULL,
  description VARCHAR(255) NOT NULL,
  status VARCHAR(4),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE
);
