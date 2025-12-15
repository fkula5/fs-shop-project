import type { Order, OrderItem, OrderList } from "./types";

const calculateItemValue = (item: OrderItem): number => {
  return 0;
};

export const calculateOrderTotal = (order: Order): number => {
  return 0;
};

export const filterCompleted =
  () =>
  (orders: OrderList): OrderList => {
    return orders.filter((o) => o.status === "completed");
  };

export const filterHighValueOrders =
  (threshold: number) =>
  (orders: OrderList): OrderList => {
    return orders;
  };

export const getCustomerIds =
  () =>
  (orders: OrderList): ReadonlyArray<string> => {
    return [];
  };

export const totalRevenue = (orders: OrderList): number => {
  return 0;
};
