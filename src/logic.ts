import type { Order, OrderItem, OrderList } from "./types";

const calculateItemValue = (item: OrderItem): number => {
  return item.unitPrice.amount * item.quantity;
};

export const calculateOrderTotal = (order: Order): number => {
  const itemsTotal = order.items.reduce(
    (acc, item) => acc + calculateItemValue(item),
    0
  );
  const discountMultiplier = 1 - (order.discount || 0);
  return itemsTotal * discountMultiplier;
};

export const filterByStatus =
  (status: Order["status"]) =>
  (orders: OrderList): OrderList => {
    return orders.filter((o) => o.status === status);
  };

export const filterCompleted = () => filterByStatus("completed");

export const filterHighValueOrders =
  (threshold: number) =>
  (orders: OrderList): OrderList => {
    return orders.filter((o) => calculateOrderTotal(o) >= threshold);
  };

export const filterByCategory =
  (category: OrderItem["category"]) =>
  (orders: OrderList): OrderList => {
    return orders.filter((order) =>
      order.items.some((item) => item.category === category)
    );
  };

export const filterByCustomer =
  (customerId: string) =>
  (orders: OrderList): OrderList => {
    return orders.filter((o) => o.customerId === customerId);
  };

export const filterWithDiscount =
  () =>
  (orders: OrderList): OrderList => {
    return orders.filter((o) => (o.discount || 0) > 0);
  };

export const getCustomerIds =
  () =>
  (orders: OrderList): ReadonlyArray<string> => {
    return orders.map((o) => o.customerId);
  };

export const getUniqueCustomerIds =
  () =>
  (orders: OrderList): ReadonlyArray<string> => {
    return Array.from(new Set(orders.map((o) => o.customerId)));
  };

export const getAllCategories =
  () =>
  (orders: OrderList): ReadonlyArray<OrderItem["category"]> => {
    const categories = orders.flatMap((order) =>
      order.items.map((item) => item.category)
    );
    return Array.from(new Set(categories));
  };

export const totalRevenue = (orders: OrderList): number => {
  return orders.reduce((acc, order) => acc + calculateOrderTotal(order), 0);
};

export const totalItemsCount = (orders: OrderList): number => {
  return orders.reduce(
    (acc, order) =>
      acc + order.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  );
};

export const averageOrderValue = (orders: OrderList): number => {
  if (orders.length === 0) return 0;
  return totalRevenue(orders) / orders.length;
};

export const maxOrderValue = (orders: OrderList): number => {
  if (orders.length === 0) return 0;
  return Math.max(...orders.map(calculateOrderTotal));
};

export const minOrderValue = (orders: OrderList): number => {
  if (orders.length === 0) return 0;
  return Math.min(...orders.map(calculateOrderTotal));
};

export const sortByValueDesc =
  () =>
  (orders: OrderList): OrderList => {
    return [...orders].sort(
      (a, b) => calculateOrderTotal(b) - calculateOrderTotal(a)
    );
  };

export const sortByValueAsc =
  () =>
  (orders: OrderList): OrderList => {
    return [...orders].sort(
      (a, b) => calculateOrderTotal(a) - calculateOrderTotal(b)
    );
  };

export const groupByStatus = (orders: OrderList): Record<string, OrderList> => {
  return orders.reduce((acc, order) => {
    const status = order.status;
    return {
      ...acc,
      [status]: [...(acc[status] || []), order],
    };
  }, {} as Record<string, OrderList>);
};

export const groupByCustomer = (
  orders: OrderList
): Record<string, OrderList> => {
  return orders.reduce((acc, order) => {
    const customerId = order.customerId;
    return {
      ...acc,
      [customerId]: [...(acc[customerId] || []), order],
    };
  }, {} as Record<string, OrderList>);
};

export const calculateStatistics = (orders: OrderList) => {
  return {
    totalOrders: orders.length,
    totalRevenue: totalRevenue(orders),
    averageOrderValue: averageOrderValue(orders),
    maxOrderValue: maxOrderValue(orders),
    minOrderValue: minOrderValue(orders),
    totalItems: totalItemsCount(orders),
    uniqueCustomers: getUniqueCustomerIds()(orders).length,
    categories: getAllCategories()(orders),
    ordersByStatus: groupByStatus(orders),
  };
};
