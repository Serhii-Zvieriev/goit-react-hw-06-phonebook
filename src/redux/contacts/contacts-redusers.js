import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

import { addContact, deleteContact } from "./contacts-actions";
import { filterReducers } from "../filter/filter-redusers";

const contactsListReducer = createReducer(
  [
    // { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    // { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    // { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    // { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ],
  {
    [addContact]: (state, action) => [action.payload, ...state],
    [deleteContact]: (state, action) =>
      state.filter((contact) => contact.id !== action.payload),
  }
);

export const contactsReducer = combineReducers({
  items: contactsListReducer,
  filter: filterReducers,
});
