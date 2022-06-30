import {
  ADD_FINANCEDP,
  DELETE_FINANCEDP,
  LOAD_FINANCEDATA,
  UPDATE_FINANCEDP,
} from "../actionTypes.js";

const financeData = (state = initialFinanceData, action) => {
  switch (action.type) {
    case LOAD_FINANCEDATA: {
      const dataArray = action.payload;
      return dataArray;
    }

    case ADD_FINANCEDP: {
      const datapoint = action.payload;
      return [...state, datapoint];
    }

    case DELETE_FINANCEDP: {
      const datapointId = action.payload;
      return state.filter((item) => item.docId !== datapointId);
    }

    case UPDATE_FINANCEDP: {
      const datapoint = action.payload;

      return state.map((item) => {
        if (item.docId === datapoint.docId) {
          return datapoint;
        }
        return item;
      });
    }

    default:
      return state;
  }
};

export default financeData;

const initialFinanceData = [];
