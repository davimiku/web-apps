import { callAction, renderRequest } from "@parcel/rsc/node";
import express from "express";
import { Listmates } from "./Listmates";
import { ListDetail } from "./lists/ListDetail";
import { Lists } from "./lists/Lists";

const router = express.Router();

router.get("/", async (req, res) => {
  await renderRequest(req, res, <Listmates />, { component: Listmates });
});

router.get("/lists", async (req, res) => {
  await renderRequest(req, res, <Lists />, { component: Lists });
});

router.get("/lists/:id", async (req, res) => {
  await renderRequest(req, res, <ListDetail id={req.params.id} />, {
    component: Lists,
  });
});

router.post("/lists", async (req, res) => {
  const id = req.get("rsc-action-id");
  const { result } = await callAction(req, id);
  let root: any = <Lists />;
  if (id) {
    root = { result, root };
  }
  await renderRequest(req, res, root, { component: Lists });
});

export { router };
