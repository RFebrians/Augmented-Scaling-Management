import {
  LOAD_FINANCEDATA,
  ADD_FINANCEDP,
  DELETE_FINANCEDP,
  UPDATE_FINANCEDP,
} from "../actionTypes.js";

export function loadFinanceData(dataArray) {
  return {
    type: LOAD_FINANCEDATA,
    payload: dataArray,
  };
}

export function addFinanceItem(datapoint) {
  return {
    type: ADD_FINANCEDP,
    payload: datapoint,
  };
}

export function deleteFinanceItem(datapointId) {
  return {
    type: DELETE_FINANCEDP,
    payload: datapointId,
  };
}

export function updateFinanceItem(datapoint) {
  return {
    type: UPDATE_FINANCEDP,
    payload: datapoint,
  };
}
