import { TODOS } from "./helpers.js";
import { createMdStore } from "./mdStore.js";

const store = createMdStore(TODOS);

export const add_todo = store.add;
export const get_todo = store.get;
export const list_todos = store.list;
export const delete_todo = store.remove;
export const clear_todos = store.clear;
