import { put, takeLatest } from "redux-saga/effects";

export function* authLogin() {
	yield put({ type: "LOGIN" });
}
export function* watchAuthLatest() {
	yield takeLatest("AUTH_LATEST", authLogin);
}
