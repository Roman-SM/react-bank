import { useAuth } from "@shared/lib/guards/UseAuth";
import { backendBaseUrl } from "@shared/config/backendUrl";
import {
  REQUEST_ACTION_TYPE,
  requestInitialState,
  requestReducer,
} from "@shared/config/request";
import { convertDataTransactionsList } from "@shared/data/convertData";
import { useEffect, useReducer, useRef } from "react";

export function useBalanceInfo() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const { states } = useAuth();
  const balance = useRef(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch(`${backendBaseUrl}/balance-info`, {
          method: "GET",
          headers: {
            Authorization: `${states.user?.email}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          dispatch({
            type: REQUEST_ACTION_TYPE.SUCCESS,
            payload: convertDataTransactionsList(data.transactions),
          });
          balance.current = data.balance;
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
    fetchBalance();
  }, [states.user?.email]);

  return { state, balance };
}
