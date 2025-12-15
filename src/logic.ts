import type { Order, OrderItem, OrderList } from "./types";

const calculateItemValue = (item: OrderItem): number => {
  return item.unitPrice.amount * item.quantity;
};

export const calculateOrderTotal = (order: Order): number => {
  const itemsTotal = order.items.reduce(
    (acc, item) => acc + calculateItemValue(item),
    0
  );
  return itemsTotal - (order.discount || 0);
};

export const filterCompleted =
  () =>
  (orders: OrderList): OrderList => {
    return orders.filter((o) => o.status === "completed");
  };

export const filterHighValueOrders =
  (threshold: number) =>
  (orders: OrderList): OrderList => {
    orders = orders.filter((o) => calculateOrderTotal(o) >= threshold);
    return orders;
  };

export const getCustomerIds =
  () =>
  (orders: OrderList): ReadonlyArray<string> => {
    return orders.map((o) => o.customerId);
  };

export const totalRevenue = (orders: OrderList): number => {
  return orders.reduce((acc, order) => acc + calculateOrderTotal(order), 0);
};
