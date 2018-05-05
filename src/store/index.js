import { createStore, applyMiddleware } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

import rootReducer from "./reducers";

export default createStore(rootReducer, devToolsEnhancer());
