import { useState, useMemo } from "react";
import "./App.css";
import { orders } from "./data";
import { pipe } from "./utils";
import {
  filterCompleted,
  filterHighValueOrders,
  calculateOrderTotal,
  totalRevenue,
} from "./logic";

function App() {
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);
  const [minPrice, setMinPrice] = useState(0);

  const processedOrders = useMemo(() => {
    return pipe(
      orders,
      showOnlyCompleted ? filterCompleted() : (x) => x,
      filterHighValueOrders(minPrice)
    );
  }, [showOnlyCompleted, minPrice]);

  const currentRevenue = useMemo(
    () => totalRevenue(processedOrders),
    [processedOrders]
  );

  return (
    <div className="container">
      <header className="header">
        <h1>🛍️ Functional Shop Dashboard</h1>
      </header>

      <section className="stats-panel">
        <div className="card">
          <h3>Widoczne zamówienia</h3>
          <div className="stat-value">{processedOrders.length}</div>
        </div>
        <div className="card">
          <h3>Całkowity Przychód</h3>
          <div className="stat-value">{currentRevenue.toFixed(2)} PLN</div>
        </div>
      </section>

      <section className="controls">
        <label>
          <input
            type="checkbox"
            checked={showOnlyCompleted}
            onChange={(e) => setShowOnlyCompleted(e.target.checked)}
          />{" "}
          Pokaż tylko zakończone
        </label>

        <label>
          Minimalna kwota zamówienia:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </section>

      <section className="order-list">
        {processedOrders.map((order) => (
          <div key={order.id} className={`order-item ${order.status}`}>
            <div>
              <strong>Zamówienie #{order.id}</strong>
              <div style={{ color: "#666", fontSize: "0.9em" }}>
                Klient: {order.customerId} | Pozycji: {order.items.length}
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                {calculateOrderTotal(order).toFixed(2)} PLN
              </div>
              <span className="badge">{order.status}</span>
            </div>
          </div>
        ))}

        {processedOrders.length === 0 && (
          <p style={{ textAlign: "center", color: "#888" }}>
            Brak zamówień spełniających kryteria.
          </p>
        )}
      </section>
    </div>
  );
}

export default App;
