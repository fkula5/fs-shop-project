export type Currency = "PLN" | "EUR" | "USD";

export interface Price {
  readonly amount: number;
  readonly currency: Currency;
}

export interface OrderItem {
  readonly name: string;
  readonly unitPrice: Price;
  readonly quantity: number;
  readonly category: "Electronics" | "Books" | "Clothing";
}

export interface Order {
  readonly id: string;
  readonly customerId: string;
  readonly status: "pending" | "completed" | "cancelled" | "refunded";
  readonly items: ReadonlyArray<OrderItem>;
  readonly discount?: number;
}

export type OrderList = ReadonlyArray<Order>;
