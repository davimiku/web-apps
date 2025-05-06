"use server-entry";

import "./base.css";
import "./client";

export function Home() {
  return (
    <html lang="en">
      <head>
        <title>Apps</title>
      </head>
      <body>
        <h1>Apps</h1>
        <p>
          <a href="/listmates/">Listmates</a>
        </p>
      </body>
    </html>
  );
}
