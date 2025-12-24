import type { Order } from "../types";
import { calculateOrderTotal } from "../logic";

interface BadgeProps {
  readonly status: Order["status"];
}

const StatusBadge = ({ status }: BadgeProps) => (
  <span className={`badge ${status}`}>{status}</span>
);

interface DiscountBadgeProps {
  readonly discount: number;
}

const DiscountBadge = ({ discount }: DiscountBadgeProps) => (
  <span className="discount-badge">-{(discount * 100).toFixed(0)}%</span>
);

interface OrderHeaderProps {
  readonly id: string;
  readonly status: Order["status"];
  readonly discount?: number;
}

const OrderHeader = ({ id, status, discount }: OrderHeaderProps) => (
  <div className="order-header">
    <strong>Zamówienie #{id}</strong>
    <StatusBadge status={status} />
    {discount && discount > 0 && <DiscountBadge discount={discount} />}
  </div>
);

interface OrderDetailsProps {
  readonly customerId: string;
  readonly itemCount: number;
  readonly categories: ReadonlyArray<string>;
}

const OrderDetails = ({
  customerId,
  itemCount,
  categories,
}: OrderDetailsProps) => (
  <div className="order-details">
    <span>👤 {customerId}</span>
    <span>📦 {itemCount} pozycji</span>
    <span>🏷️ {categories.join(", ")}</span>
  </div>
);

interface ItemRowProps {
  readonly name: string;
  readonly quantity: number;
  readonly price: number;
}

const ItemRow = ({ name, quantity, price }: ItemRowProps) => (
  <div className="item-row">
    <span>{name}</span>
    <span className="item-quantity">x{quantity}</span>
    <span className="item-price">{price.toFixed(2)} PLN</span>
  </div>
);

interface OrderItemsProps {
  readonly items: Order["items"];
}

const OrderItems = ({ items }: OrderItemsProps) => (
  <div className="order-items">
    {items.map((item, idx) => (
      <ItemRow
        key={idx}
        name={item.name}
        quantity={item.quantity}
        price={item.unitPrice.amount * item.quantity}
      />
    ))}
  </div>
);

interface OrderTotalProps {
  readonly total: number;
}

const OrderTotal = ({ total }: OrderTotalProps) => (
  <div className="order-total">
    <div className="total-value">{total.toFixed(2)} PLN</div>
  </div>
);

interface OrderItemProps {
  readonly order: Order;
}

export const OrderItem = ({ order }: OrderItemProps) => {
  const orderTotal = calculateOrderTotal(order);
  const categories = Array.from(new Set(order.items.map((i) => i.category)));

  return (
    <div className={`order-item ${order.status}`}>
      <div className="order-main">
        <OrderHeader
          id={order.id}
          status={order.status}
          discount={order.discount}
        />
        <OrderDetails
          customerId={order.customerId}
          itemCount={order.items.length}
          categories={categories}
        />
        <OrderItems items={order.items} />
      </div>
      <OrderTotal total={orderTotal} />
    </div>
  );
};
