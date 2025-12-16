import type { Order } from "./types";

export const orders: ReadonlyArray<Order> = [
  {
    id: "o1",
    customerId: "c1",
    status: "completed",
    items: [
      {
        name: "Laptop Dell XPS",
        unitPrice: { amount: 2500, currency: "PLN" },
        quantity: 1,
        category: "Electronics",
      },
      {
        name: "Mouse Logitech MX",
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
        name: "T-Shirt Premium",
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
        name: "Book: Functional Programming in TypeScript",
        unitPrice: { amount: 80, currency: "PLN" },
        quantity: 1,
        category: "Books",
      },
      {
        name: "Book: Clean Code",
        unitPrice: { amount: 65, currency: "PLN" },
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
        name: "Monitor 4K Samsung",
        unitPrice: { amount: 800, currency: "PLN" },
        quantity: 2,
        category: "Electronics",
      },
    ],
  },
  {
    id: "o5",
    customerId: "c2",
    status: "completed",
    items: [
      {
        name: "Jeans Levi's",
        unitPrice: { amount: 250, currency: "PLN" },
        quantity: 2,
        category: "Clothing",
      },
      {
        name: "Sneakers Nike",
        unitPrice: { amount: 350, currency: "PLN" },
        quantity: 1,
        category: "Clothing",
      },
    ],
    discount: 0.15,
  },
  {
    id: "o6",
    customerId: "c4",
    status: "refunded",
    items: [
      {
        name: "Mechanical Keyboard",
        unitPrice: { amount: 400, currency: "PLN" },
        quantity: 1,
        category: "Electronics",
      },
    ],
  },
  {
    id: "o7",
    customerId: "c1",
    status: "completed",
    items: [
      {
        name: "Book: Design Patterns",
        unitPrice: { amount: 90, currency: "PLN" },
        quantity: 1,
        category: "Books",
      },
      {
        name: "Book: Refactoring",
        unitPrice: { amount: 75, currency: "PLN" },
        quantity: 1,
        category: "Books",
      },
      {
        name: "Book: Domain-Driven Design",
        unitPrice: { amount: 95, currency: "PLN" },
        quantity: 1,
        category: "Books",
      },
    ],
    discount: 0.2,
  },
  {
    id: "o8",
    customerId: "c5",
    status: "pending",
    items: [
      {
        name: "Gaming Headset",
        unitPrice: { amount: 280, currency: "PLN" },
        quantity: 1,
        category: "Electronics",
      },
      {
        name: "Webcam HD",
        unitPrice: { amount: 150, currency: "PLN" },
        quantity: 1,
        category: "Electronics",
      },
    ],
  },
  {
    id: "o9",
    customerId: "c3",
    status: "completed",
    items: [
      {
        name: "Hoodie Supreme",
        unitPrice: { amount: 420, currency: "PLN" },
        quantity: 1,
        category: "Clothing",
      },
    ],
  },
  {
    id: "o10",
    customerId: "c6",
    status: "cancelled",
    items: [
      {
        name: "Book: JavaScript: The Good Parts",
        unitPrice: { amount: 55, currency: "PLN" },
        quantity: 2,
        category: "Books",
      },
    ],
  },
  {
    id: "o11",
    customerId: "c4",
    status: "completed",
    items: [
      {
        name: "MacBook Pro 16",
        unitPrice: { amount: 8500, currency: "PLN" },
        quantity: 1,
        category: "Electronics",
      },
      {
        name: "USB-C Hub",
        unitPrice: { amount: 180, currency: "PLN" },
        quantity: 1,
        category: "Electronics",
      },
      {
        name: "Laptop Sleeve",
        unitPrice: { amount: 80, currency: "PLN" },
        quantity: 1,
        category: "Electronics",
      },
    ],
    discount: 0.05,
  },
  {
    id: "o12",
    customerId: "c2",
    status: "pending",
    items: [
      {
        name: "Winter Jacket",
        unitPrice: { amount: 680, currency: "PLN" },
        quantity: 1,
        category: "Clothing",
      },
    ],
  },
];
