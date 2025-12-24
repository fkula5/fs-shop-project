interface Statistics {
  readonly totalOrders: number;
  readonly totalRevenue: number;
  readonly averageOrderValue: number;
  readonly minOrderValue: number;
  readonly maxOrderValue: number;
  readonly totalItems: number;
  readonly uniqueCustomers: number;
}

interface StatCardProps {
  readonly title: string;
  readonly value: string | number;
  readonly label?: string;
}

const StatCard = ({ title, value, label }: StatCardProps) => (
  <div className="card">
    <h3>{title}</h3>
    <div className="stat-value">{value}</div>
    {label && <div className="stat-label">{label}</div>}
  </div>
);

interface RangeStatCardProps {
  readonly title: string;
  readonly min: number;
  readonly max: number;
}

const RangeStatCard = ({ title, min, max }: RangeStatCardProps) => (
  <div className="card">
    <h3>{title}</h3>
    <div className="stat-value-small">Min: {min.toFixed(2)} PLN</div>
    <div className="stat-value-small">Max: {max.toFixed(2)} PLN</div>
  </div>
);

interface StatsPanelProps {
  readonly stats: Statistics;
  readonly totalOrders: number;
}

export const StatsPanel = ({ stats, totalOrders }: StatsPanelProps) => (
  <section className="stats-panel">
    <StatCard
      title="📦 Widoczne zamówienia"
      value={stats.totalOrders}
      label={`z ${totalOrders} ogółem`}
    />

    <StatCard
      title="💰 Przychód"
      value={`${stats.totalRevenue.toFixed(2)} PLN`}
      label={`Średnia: ${stats.averageOrderValue.toFixed(2)} PLN`}
    />

    <RangeStatCard
      title="📊 Zakres wartości"
      min={stats.minOrderValue}
      max={stats.maxOrderValue}
    />

    <StatCard
      title="👥 Klienci"
      value={stats.uniqueCustomers}
      label="unikalnych"
    />

    <StatCard
      title="🎯 Produkty"
      value={stats.totalItems}
      label="sztuk ogółem"
    />
  </section>
);
