import { all } from "redux-saga/effects";

import { watchAuthLatest } from "./auth.saga";
export default function* rootSaga() {
	yield all([watchAuthLatest]);
}
