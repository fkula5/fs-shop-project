import type { OrderList } from "../types";
import { totalRevenue } from "../logic";

interface StatusCardProps {
  readonly status: string;
  readonly orders: OrderList;
}

const StatusCard = ({ status, orders }: StatusCardProps) => (
  <div className={`status-card ${status}`}>
    <div className="status-name">{status}</div>
    <div className="status-count">{orders.length}</div>
    <div className="status-revenue">{totalRevenue(orders).toFixed(2)} PLN</div>
  </div>
);

interface StatusSummaryProps {
  readonly ordersByStatus: Record<string, OrderList>;
}

export const StatusSummary = ({ ordersByStatus }: StatusSummaryProps) => (
  <section className="status-summary">
    <h3>📈 Podsumowanie po statusach:</h3>
    <div className="status-grid">
      {Object.entries(ordersByStatus).map(([status, orderList]) => (
        <StatusCard key={status} status={status} orders={orderList} />
      ))}
    </div>
  </section>
);
