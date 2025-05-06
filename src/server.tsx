import { callAction, renderRequest } from "@parcel/rsc/node";
import express from "express";

// Page components. These must have "use server-entry" so they are treated as code splitting entry points.
import { About } from "./About";
import { Home } from "./Home";

import { router as listsRouter } from "./listmates/router";

const app = express();

app.use(express.static("dist"));

app.get("/", async (req, res) => {
  await renderRequest(req, res, <Home />, { component: Home });
});

// app.use((req, res, next) => {
//   if (!req.path.endsWith("/") && !req.path.includes(".")) {
//     res.redirect(301, req.path + "/");
//   } else {
//     next();
//   }
// });

app.get("/about", async (req, res) => {
  await renderRequest(req, res, <About />, { component: About });
});

app.use("/listmates", listsRouter);

app.post("/", async (req, res) => {
  const id = req.get("rsc-action-id");
  const { result } = await callAction(req, id);
  let root: any = <Home />;
  if (id) {
    root = { result, root };
  }
  await renderRequest(req, res, root, { component: Home });
});

app.listen(3000);
console.log("Server listening on port 3000");
