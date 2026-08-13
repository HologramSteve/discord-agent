import { NOTES } from "./helpers.js";
import { createMdStore } from "./mdStore.js";

const store = createMdStore(NOTES);

export const add_note = store.add;
export const get_note = store.get;
export const list_notes = store.list;
export const delete_note = store.remove;
export const clear_notes = store.clear;
