import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { contactsReducer } from "./contacts/contacts-redusers";

const persistConfig = {
  key: "contacts",
  storage,
  blacklist: ["filter"],
};

const rootReducer = combineReducers({
  contacts: persistReducer(persistConfig, contactsReducer),
});

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);

//============ STOR =============
// {
//     contacts: {
//       items: [],
//       filter: ''
//     }
//   }
