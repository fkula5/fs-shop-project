import type { OrderList as OrderListType } from "../types";
import { OrderItem } from "./OrderItem";

interface EmptyStateProps {
  readonly onReset: () => void;
}

const EmptyState = ({ onReset }: EmptyStateProps) => (
  <div className="empty-state">
    <p>🔍 Brak zamówień spełniających kryteria.</p>
    <button onClick={onReset}>Resetuj filtry</button>
  </div>
);

interface OrderListProps {
  readonly orders: OrderListType;
  readonly onReset: () => void;
}

export const OrderList = ({ orders, onReset }: OrderListProps) => (
  <section className="order-list">
    <h3>📋 Lista zamówień ({orders.length})</h3>

    {orders.length === 0 ? (
      <EmptyState onReset={onReset} />
    ) : (
      orders.map((order) => <OrderItem key={order.id} order={order} />)
    )}
  </section>
);
