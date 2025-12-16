import { useState, useMemo } from "react";
import "./App.css";
import { orders } from "./data";
import { pipe } from "./utils";
import {
  filterByStatus,
  filterHighValueOrders,
  filterByCategory,
  filterByCustomer,
  filterWithDiscount,
  calculateOrderTotal,
  totalRevenue,
  calculateStatistics,
  sortByValueDesc,
  sortByValueAsc,
  getUniqueCustomerIds,
  getAllCategories,
} from "./logic";
import type { Order } from "./types";

function App() {
  const [selectedStatus, setSelectedStatus] = useState<Order["status"] | "all">(
    "all"
  );
  const [minPrice, setMinPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<string>("all");
  const [showOnlyDiscount, setShowOnlyDiscount] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");

  const uniqueCustomers = useMemo(() => getUniqueCustomerIds()(orders), []);
  const allCategories = useMemo(() => getAllCategories()(orders), []);

  const processedOrders = useMemo(() => {
    return pipe(
      orders,
      selectedStatus !== "all" ? filterByStatus(selectedStatus) : (x) => x,
      filterHighValueOrders(minPrice),
      selectedCategory !== "all"
        ? filterByCategory(selectedCategory as Order["items"][0]["category"])
        : (x) => x,
      selectedCustomer !== "all"
        ? filterByCustomer(selectedCustomer)
        : (x) => x,
      showOnlyDiscount ? filterWithDiscount() : (x) => x,
      sortOrder === "desc"
        ? sortByValueDesc()
        : sortOrder === "asc"
        ? sortByValueAsc()
        : (x) => x
    );
  }, [
    selectedStatus,
    minPrice,
    selectedCategory,
    selectedCustomer,
    showOnlyDiscount,
    sortOrder,
  ]);

  const stats = useMemo(
    () => calculateStatistics(processedOrders),
    [processedOrders]
  );

  const resetFilters = () => {
    setSelectedStatus("all");
    setMinPrice(0);
    setSelectedCategory("all");
    setSelectedCustomer("all");
    setShowOnlyDiscount(false);
    setSortOrder("none");
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🛍️ Panel sklepu</h1>
        <button onClick={resetFilters} className="reset-btn">
          🔄 Resetuj filtry
        </button>
      </header>

      <section className="stats-panel">
        <div className="card">
          <h3>📦 Widoczne zamówienia</h3>
          <div className="stat-value">{stats.totalOrders}</div>
          <div className="stat-label">z {orders.length} ogółem</div>
        </div>

        <div className="card">
          <h3>💰 Przychód</h3>
          <div className="stat-value">{stats.totalRevenue.toFixed(2)} PLN</div>
          <div className="stat-label">
            Średnia: {stats.averageOrderValue.toFixed(2)} PLN
          </div>
        </div>

        <div className="card">
          <h3>📊 Zakres wartości</h3>
          <div className="stat-value-small">
            Min: {stats.minOrderValue.toFixed(2)} PLN
          </div>
          <div className="stat-value-small">
            Max: {stats.maxOrderValue.toFixed(2)} PLN
          </div>
        </div>

        <div className="card">
          <h3>👥 Klienci</h3>
          <div className="stat-value">{stats.uniqueCustomers}</div>
          <div className="stat-label">unikalnych</div>
        </div>

        <div className="card">
          <h3>🎯 Produkty</h3>
          <div className="stat-value">{stats.totalItems}</div>
          <div className="stat-label">sztuk ogółem</div>
        </div>
      </section>

      <section className="controls">
        <div className="control-group">
          <label>
            <strong>Status:</strong>
            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value as Order["status"] | "all")
              }
            >
              <option value="all">Wszystkie</option>
              <option value="completed">Zakończone</option>
              <option value="pending">Oczekujące</option>
              <option value="cancelled">Anulowane</option>
              <option value="refunded">Zwrócone</option>
            </select>
          </label>
        </div>

        <div className="control-group">
          <label>
            <strong>Kategoria:</strong>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Wszystkie</option>
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="control-group">
          <label>
            <strong>Klient:</strong>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              <option value="all">Wszyscy</option>
              {uniqueCustomers.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="control-group">
          <label>
            <strong>Min. wartość:</strong>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              min="0"
              step="100"
            />
          </label>
        </div>

        <div className="control-group">
          <label>
            <strong>Sortowanie:</strong>
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "asc" | "desc" | "none")
              }
            >
              <option value="none">Domyślne</option>
              <option value="desc">Wartość ↓</option>
              <option value="asc">Wartość ↑</option>
            </select>
          </label>
        </div>

        <div className="control-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showOnlyDiscount}
              onChange={(e) => setShowOnlyDiscount(e.target.checked)}
            />
            Tylko z rabatem 🏷️
          </label>
        </div>
      </section>

      <section className="status-summary">
        <h3>📈 Podsumowanie po statusach:</h3>
        <div className="status-grid">
          {Object.entries(stats.ordersByStatus).map(([status, orderList]) => (
            <div key={status} className={`status-card ${status}`}>
              <div className="status-name">{status}</div>
              <div className="status-count">{orderList.length}</div>
              <div className="status-revenue">
                {totalRevenue(orderList).toFixed(2)} PLN
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="order-list">
        <h3>📋 Lista zamówień ({processedOrders.length})</h3>

        {processedOrders.map((order) => {
          const orderTotal = calculateOrderTotal(order);
          const hasDiscount = (order.discount || 0) > 0;

          return (
            <div key={order.id} className={`order-item ${order.status}`}>
              <div className="order-main">
                <div className="order-header">
                  <strong>Zamówienie #{order.id}</strong>
                  <span className={`badge ${order.status}`}>
                    {order.status}
                  </span>
                  {hasDiscount && (
                    <span className="discount-badge">
                      -{(order.discount! * 100).toFixed(0)}%
                    </span>
                  )}
                </div>

                <div className="order-details">
                  <span>👤 {order.customerId}</span>
                  <span>📦 {order.items.length} pozycji</span>
                  <span>
                    🏷️{" "}
                    {Array.from(
                      new Set(order.items.map((i) => i.category))
                    ).join(", ")}
                  </span>
                </div>

                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="item-row">
                      <span>{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                      <span className="item-price">
                        {(item.unitPrice.amount * item.quantity).toFixed(2)} PLN
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-total">
                <div className="total-value">{orderTotal.toFixed(2)} PLN</div>
              </div>
            </div>
          );
        })}

        {processedOrders.length === 0 && (
          <div className="empty-state">
            <p>🔍 Brak zamówień spełniających kryteria.</p>
            <button onClick={resetFilters}>Resetuj filtry</button>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
