import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import {
  requestInitialState,
  requestReducer,
  REQUEST_ACTION_TYPE,
} from "@shared/config/request";
import { backendBaseUrl } from "@shared/config";
import { notificationsConvertData } from "@shared/data";

export function useNotificationInfo() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const { notificationId } = useParams();

  useEffect(() => {
    const fetchNotificationInfo = async () => {
      dispatch({ type: REQUEST_ACTION_TYPE.PROGRESS });
      try {
        const res = await fetch(
          `${backendBaseUrl}/notification-info/${notificationId}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        if (res.ok) {
          dispatch({
            type: REQUEST_ACTION_TYPE.SUCCESS,
            payload: notificationsConvertData(data),
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
    fetchNotificationInfo();
  }, [notificationId]);

  return state;
}
