import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  query,
  remove,
  child,
  update,
} from "firebase/database";
import { database } from "../auth/getAuth";

export const updateInfo = (info) => {
  const newUserKey = push(child(ref(database), "contact/")).key;
  const updates = {};
  updates["contact/" + newUserKey] = info;
  return update(ref(database), updates);
};
