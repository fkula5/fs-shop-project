import "./App.css";
import { orders } from "./data";
import { useOrderFilters } from "./hooks/useOrderFilters";
import { Header } from "./components/Header";
import { StatsPanel } from "./components/StatsPanel";
import { FilterControls } from "./components/FilterControls";
import { StatusSummary } from "./components/StatusSummary";
import { OrderList } from "./components/OrderList";

function App() {
  const {
    filters,
    processedOrders,
    stats,
    uniqueCustomers,
    allCategories,
    updateFilter,
    resetFilters,
  } = useOrderFilters(orders);

  return (
    <div className="container">
      <Header onReset={resetFilters} />

      <StatsPanel stats={stats} totalOrders={orders.length} />

      <FilterControls
        filters={filters}
        uniqueCustomers={uniqueCustomers}
        allCategories={allCategories}
        onFilterChange={updateFilter}
      />

      <StatusSummary ordersByStatus={stats.ordersByStatus} />

      <OrderList orders={processedOrders} onReset={resetFilters} />
    </div>
  );
}

export default App;
