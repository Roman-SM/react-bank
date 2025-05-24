import { backendBaseUrl } from "@shared/config/backendUrl";
import {
  REQUEST_ACTION_TYPE,
  requestInitialState,
  requestReducer,
} from "@shared/config/request";
import { useEffect, useReducer } from "react";
import { useAuth } from "@shared/lib/guards/UseAuth";
import { notificationsConvertDataList } from "@shared/data";

export function useNotifications() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const { states } = useAuth();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch(`${backendBaseUrl}/notifications-list`, {
          method: "GET",
          headers: {
            Authorization: `${states.user?.email}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          dispatch({
            type: REQUEST_ACTION_TYPE.SUCCESS,
            payload: notificationsConvertDataList(data),
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

    fetchBalance();
  }, [states.user?.email]);

  return {
    state,
  };
}
