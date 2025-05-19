import { callAction, renderRequest } from "@parcel/rsc/node";
import express from "express";
import { JSX } from "react";
import { Listmates } from "./Listmates";
import { ListArchive } from "./lists/archive/ListArchive";
import { ListDetail } from "./lists/detail/ListDetail";
import { ListEdit } from "./lists/ListEdit";
import { Lists } from "./lists/Lists";

const router = express.Router();

router.get("/", async (req, res) => {
  await renderRequest(req, res, <Listmates />, { component: Listmates });
});

router.get("/lists", async (req, res) => {
  await renderRequest(req, res, <Lists />, { component: Lists });
});

router.get("/lists/:id", async (req, res) => {
  await renderRequest(req, res, <ListDetail id={req.params.id} />);
});

router.get("/lists/:id/edit", async (req, res) => {
  await renderRequest(req, res, <ListEdit id={req.params.id} />, {
    // component: ListDetail,
  });
});

router.get("/lists/:id/archive", async (req, res) => {
  await renderRequest(req, res, <ListArchive id={req.params.id} />, {
    // component: ListArchive,
  });
});

type Root = JSX.Element | { result: unknown; root: JSX.Element };

router.post("/lists", async (req, res) => {
  const id = req.get("rsc-action-id");
  const result = (await callAction(req, id)).result as Root;
  let root: Root = <Lists />;
  if (id) {
    root = { result, root };
  }
  await renderRequest(req, res, root, { component: Lists });
});

router.post("/lists/:listId", async (req, res) => {
  const listId = req.params.listId;
  const id = req.get("rsc-action-id");
  const result = (await callAction(req, id)).result as Root;
  let root: Root = <ListDetail id={listId} />;
  if (id) {
    root = { result, root };
  }
  const component = ListDetail as React.ComponentType;
  await renderRequest(req, res, root, { component });
});

export { router };
