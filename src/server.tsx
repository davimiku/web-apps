import { callAction, renderRequest } from "@parcel/rsc/node";
import express from "express";
import path from "node:path";
import { Home } from "./Home";
import { router as listsRouter } from "./listmates/router";

const app = express();

app.use(express.static("dist"));

const staticPath = path.join(__dirname, "static");
app.use("/static", express.static(staticPath));

app.get("/", async (req, res) => {
  await renderRequest(req, res, <Home />, { component: Home });
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
