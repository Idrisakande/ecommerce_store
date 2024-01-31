import { combineReducers } from "@reduxjs/toolkit";

import AUTHREDUCER from "./features/auth.slice";

const rootReducers = combineReducers({ AUTHREDUCER });
export default rootReducers;
