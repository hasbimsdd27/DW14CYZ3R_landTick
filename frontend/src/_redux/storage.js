import { createStore, combineReducers, applyMiddleware } from "redux";

import stations from "../_reducers/station";
import login from "../_reducers/auth";
import user from "../_reducers/user";
import ticket from "../_reducers/ticket";
import train from "../_reducers/train";
import transaction from "../_reducers/transaction";
import { promise, logger } from "../middleware";

const rootReducers = combineReducers({
  stations,
  login,
  user,
  ticket,
  transaction,
  train
});

const store = createStore(rootReducers, applyMiddleware(promise, logger));
export default store;
