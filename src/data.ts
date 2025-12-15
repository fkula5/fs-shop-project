import type { Order } from "./types";

export const orders: ReadonlyArray<Order> = [
  {
    id: "o1",
    customerId: "c1",
    status: "completed",
    items: [
      {
        name: "Laptop",
        unitPrice: { amount: 2500, currency: "PLN" },
        quantity: 1,
        category: "Electronics",
      },
      {
        name: "Mouse",
        unitPrice: { amount: 50, currency: "PLN" },
        quantity: 2,
        category: "Electronics",
      },
    ],
  },
  {
    id: "o2",
    customerId: "c2",
    status: "cancelled",
    items: [
      {
        name: "T-Shirt",
        unitPrice: { amount: 40, currency: "PLN" },
        quantity: 3,
        category: "Clothing",
      },
    ],
  },
  {
    id: "o3",
    customerId: "c1",
    status: "completed",
    items: [
      {
        name: "Book: FP in TS",
        unitPrice: { amount: 80, currency: "PLN" },
        quantity: 1,
        category: "Books",
      },
    ],
    discount: 0.1,
  },
  {
    id: "o4",
    customerId: "c3",
    status: "pending",
    items: [
      {
        name: "Monitor",
        unitPrice: { amount: 800, currency: "PLN" },
        quantity: 2,
        category: "Electronics",
      },
    ],
  },
];
