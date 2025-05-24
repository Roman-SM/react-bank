import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import {
  requestInitialState,
  requestReducer,
  REQUEST_ACTION_TYPE,
} from "@shared/config/request";
import { backendBaseUrl } from "@shared/config";
import { convertDataTransactionsList } from "@shared/data/convertData";

export function useTransactionInfo() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const { transactionId } = useParams();

  useEffect(() => {
    const fetchTransactionInfo = async () => {
      dispatch({ type: REQUEST_ACTION_TYPE.PROGRESS });
      try {
        const res = await fetch(
          `${backendBaseUrl}/transaction-info/${transactionId}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        if (res.ok) {
          dispatch({
            type: REQUEST_ACTION_TYPE.SUCCESS,
            payload: convertDataTransactionsList(data),
          });
        } else {
          dispatch({ type: REQUEST_ACTION_TYPE.ERROR, payload: data.message });
        }
      } catch (error: any) {
        dispatch({
          type: REQUEST_ACTION_TYPE.ERROR,
          payload: error.message,
        });
      }
    };
    fetchTransactionInfo();
  }, [transactionId]);

  return state;
}
