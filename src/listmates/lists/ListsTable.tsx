"use client";

import { useRef, useState } from "react";
import { List } from "../table";
import * as actions from "./actions/server";

export function ListsTable({ lists }: { lists: List[] }) {
  const editDialogRef = useRef<HTMLDialogElement | null>(null);
  const deleteDialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // const onEditConfirm = async ({
  //   selectedId,
  //   name,
  //   description,
  // }: {
  //   selectedId: string;
  //   name?: string;
  //   description?: string;
  // }) => {
  //   await actions.updateList(selectedId, { name, description });
  // };

  const onDeleteConfirm = async ({ selectedId }: { selectedId: string }) => {
    await actions.deleteList(selectedId);
  };

  return (
    <>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <a href={list.id}>
              <span>{list.name}</span>
            </a>
            <span>{list.description}</span>
            <button
              onClick={() => {
                setSelectedId(list.id);
                editDialogRef.current?.showModal();
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                setSelectedId(list.id);
                deleteDialogRef.current?.showModal();
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <ConfirmDialog
        ref={editDialogRef}
        heading="Edit List Configuration"
        action={actions.updateList.bind(null, selectedId!)}
        selectedId={selectedId!}
        // onConfirm={onEditConfirm}
      >
        <label>
          <span>Name</span>
          <input name="name" />
        </label>
        <label>
          <span>Description</span>
          <input name="description" />
        </label>
      </ConfirmDialog>
      <ConfirmDialog
        ref={deleteDialogRef}
        heading="Please confirm deleting list..."
        selectedId={selectedId!}
        onConfirm={onDeleteConfirm}
      />
    </>
  );
}

type DialogProps<T extends Record<string, unknown>> = T & {
  children?: React.ReactNode;
  ref: React.RefObject<HTMLDialogElement | null>;
  heading: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  action?: (formData: FormData) => Promise<void>;
  onConfirm?: (t: T) => Promise<void> | void;
  onCancel?: (t: T) => Promise<void> | void;
  onClose?: (t: T) => Promise<void> | void;
};

function ConfirmDialog<T extends Record<string, unknown>>(props: DialogProps<T>) {
  const confirmLabel = props.confirmLabel ?? "Confirm";
  const cancelLabel = props.cancelLabel ?? "Cancel";

  const cancel = () => {
    props.ref.current?.close();
    if (props.onCancel) {
      void props.onCancel(props);
    }
  };

  const confirm = () => {
    props.ref.current?.close();
    if (props.onConfirm) {
      void props.onConfirm(props);
    }
  };

  return (
    <dialog ref={props.ref}>
      <h2>{props.heading}</h2>
      <p>{props.message}</p>
      {props.children}
      <button type="submit" onClick={confirm}>
        {confirmLabel}
      </button>
      <button type="button" onClick={cancel} autoFocus>
        {cancelLabel}
      </button>
    </dialog>
  );
}
