import { ReactNode } from "react";

export type HeadProps = {
  title: string;
  children: ReactNode;
  baseHref?: string;
  description: string;
};

export function Layout({ title, description, children, baseHref }: HeadProps) {
  const base = baseHref ? <base href={baseHref} /> : null;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />

        <title>{title}</title>
        {base}
        <link rel="stylesheet" href="/static/index.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
