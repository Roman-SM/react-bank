export const notificationsConvertData = (raw: { notification?: any }) => {
  const list = raw.notification ? [raw.notification] : [];
  return {
    list,
    isEmpty: list.length === 0,
  };
};
export const notificationsConvertDataList = (raw: { notifications?: any }) => {
  const list = Array.isArray(raw.notifications)
    ? [...raw.notifications].reverse()
    : [];
  return {
    list,
    isEmpty: list.length === 0,
  };
};
export const convertDataTransactions = (raw: { transaction?: any }) => {
  const list = raw.transaction ? [raw.transaction] : [];
  return {
    list,
    isEmpty: list.length === 0,
  };
};
export const convertDataTransactionsList = (transactions: any) => {
  const list = Array.isArray(transactions) ? [...transactions].reverse() : [];
  return {
    list,
    isEmpty: list.length === 0,
  };
};
