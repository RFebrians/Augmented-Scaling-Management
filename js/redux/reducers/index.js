import { combineReducers } from "redux";
import user from "./User";
import finance from "./Finance";

const rootReducer = combineReducers({ user, finance });
export default rootReducer;
