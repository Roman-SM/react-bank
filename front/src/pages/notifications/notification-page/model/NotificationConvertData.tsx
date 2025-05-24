import { RawDataNotifications } from "@shared/types/interfaces";

export const notificationsConvertData = (raw: RawDataNotifications) => ({
  list: [...(raw.notifications || [])]
    .reverse()
    .map(({ id, date, type, text }) => ({
      id,
      date,
      type,
      text,
    })),
  isEmpty: raw.notifications.length === 0,
});
