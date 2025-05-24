import { backendBaseUrl } from "@shared/config/backendUrl";
import {
  REQUEST_ACTION_TYPE,
  requestInitialState,
  requestReducer,
} from "@shared/config/request";
import { useEffect, useReducer, useState } from "react";
import { useAuth } from "@shared/lib/guards/UseAuth";

export function useBalance() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const [balance, setBalance] = useState<number | null>(null);
  const { states } = useAuth();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch(`${backendBaseUrl}/balance`, {
          method: "GET",
          headers: {
            Authorization: `${states.user?.email}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setBalance(data.balance.toFixed(2));
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

  return {
    balance,
    state,
  };
}
