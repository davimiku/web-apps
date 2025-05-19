"use server-entry";

import "./client";
import { Layout } from "./Layout";

export function Home() {
  return (
    <Layout title="Apps" description="Collection of various web applications for personal use">
      <h1 className="text-3xl font-bold underline">Apps</h1>
      <p>
        <a href="/listmates/">Listmates</a>
      </p>
    </Layout>
  );
}
