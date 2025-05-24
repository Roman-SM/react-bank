export const notificationsConvertData = (raw: { notification?: any }) => {
  const list = raw.notification ? [raw.notification] : [];
  return {
    list,
    isEmpty: list.length === 0,
  };
};

export const convertDataTransactions = (raw: { transactions?: any }) => {
  const list = Array.isArray(raw.transactions)
    ? [...raw.transactions].reverse()
    : [];
  return {
    list,
    isEmpty: list.length === 0,
  };
};

export const convertDataTransactionsList = (raw: { transaction: any }) => {
  const list = raw.transaction ? [raw.transaction] : [];
  return {
    list,
    isEmpty: list.length === 0,
  };
};
