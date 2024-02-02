import { RootState } from "../store";

export const getOrderInfoPath = (store: RootState) => store.orderDetails;
export const getOrderNumberPath = (store: RootState) => store.orderDetails.order;