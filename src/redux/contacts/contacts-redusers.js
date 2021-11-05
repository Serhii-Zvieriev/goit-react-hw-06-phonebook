import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

import { addContact, deleteContact } from "./contacts-actions";
import { filterReducers } from "../filter/filter-redusers";

const contactsListReducer = createReducer([], {
  [addContact]: (state, action) => [action.payload, ...state],
  [deleteContact]: (state, action) =>
    state.filter((contact) => contact.id !== action.payload),
});

export const contactsReducer = combineReducers({
  items: contactsListReducer,
  filter: filterReducers,
});
