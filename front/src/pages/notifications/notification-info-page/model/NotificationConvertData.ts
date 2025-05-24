export const notificationsConvertData = (raw: { notification?: any }) => {
  const list = raw.notification ? [raw.notification] : [];
  return {
    list,
    isEmpty: list.length === 0,
  };
};
