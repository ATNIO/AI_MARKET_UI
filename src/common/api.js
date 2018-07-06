const prefix = "/api/";

export const dbots = (cur, size) => `${prefix}dbots?cur=${cur}&size=${size}`;
export const dbotDetail = address => `${prefix}dbots/${address}`;
