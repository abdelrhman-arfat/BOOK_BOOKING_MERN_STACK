// collect all reducers in one reducers :
import { combineReducers } from "redux";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import { userData } from "../RTK-query/query";
import authSlice from "../redux-slices/authSlice";
const allReducers = combineReducers({
  auth: authSlice,
  [userData.reducerPath]: userData.reducer,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth"], // Only persist auth state
};

const persistReduced = persistReducer(persistConfig, allReducers);

export { persistReduced };
