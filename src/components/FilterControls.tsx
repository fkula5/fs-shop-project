import type { Order, OrderItem } from "../types";
import type { FilterState } from "../hooks/useOrderFilters";

interface SelectOption<T = string> {
  readonly value: T;
  readonly label: string;
}

interface SelectControlProps<T extends string = string> {
  readonly label: string;
  readonly value: T;
  readonly options: ReadonlyArray<SelectOption<T>>;
  readonly onChange: (value: T) => void;
}

const SelectControl = <T extends string>({
  label,
  value,
  options,
  onChange,
}: SelectControlProps<T>) => (
  <div className="control-group">
    <label>
      <strong>{label}</strong>
      <select value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  </div>
);

interface NumberControlProps {
  readonly label: string;
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly min?: number;
  readonly step?: number;
}

const NumberControl = ({
  label,
  value,
  onChange,
  min = 0,
  step = 100,
}: NumberControlProps) => (
  <div className="control-group">
    <label>
      <strong>{label}</strong>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        step={step}
      />
    </label>
  </div>
);

interface CheckboxControlProps {
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
}

const CheckboxControl = ({
  label,
  checked,
  onChange,
}: CheckboxControlProps) => (
  <div className="control-group">
    <label className="checkbox-label">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  </div>
);

const STATUS_OPTIONS: ReadonlyArray<SelectOption<Order["status"] | "all">> = [
  { value: "all", label: "Wszystkie" },
  { value: "completed", label: "Zakończone" },
  { value: "pending", label: "Oczekujące" },
  { value: "cancelled", label: "Anulowane" },
  { value: "refunded", label: "Zwrócone" },
];

const SORT_OPTIONS: ReadonlyArray<SelectOption<"asc" | "desc" | "none">> = [
  { value: "none", label: "Domyślne" },
  { value: "desc", label: "Wartość ↓" },
  { value: "asc", label: "Wartość ↑" },
];

interface FilterControlsProps {
  readonly filters: FilterState;
  readonly uniqueCustomers: ReadonlyArray<string>;
  readonly allCategories: ReadonlyArray<OrderItem["category"]>;
  readonly onFilterChange: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => void;
}

export const FilterControls = ({
  filters,
  uniqueCustomers,
  allCategories,
  onFilterChange,
}: FilterControlsProps) => {
  const categoryOptions: ReadonlyArray<SelectOption> = [
    { value: "all", label: "Wszystkie" },
    ...allCategories.map((cat) => ({ value: cat, label: cat })),
  ];

  const customerOptions: ReadonlyArray<SelectOption> = [
    { value: "all", label: "Wszyscy" },
    ...uniqueCustomers.map((id) => ({ value: id, label: id })),
  ];

  return (
    <section className="controls">
      <SelectControl
        label="Status:"
        value={filters.status}
        options={STATUS_OPTIONS}
        onChange={(value) => onFilterChange("status", value)}
      />

      <SelectControl
        label="Kategoria:"
        value={filters.category}
        options={categoryOptions}
        onChange={(value) => onFilterChange("category", value)}
      />

      <SelectControl
        label="Klient:"
        value={filters.customer}
        options={customerOptions}
        onChange={(value) => onFilterChange("customer", value)}
      />

      <NumberControl
        label="Min. wartość:"
        value={filters.minPrice}
        onChange={(value) => onFilterChange("minPrice", value)}
      />

      <SelectControl
        label="Sortowanie:"
        value={filters.sortOrder}
        options={SORT_OPTIONS}
        onChange={(value) => onFilterChange("sortOrder", value)}
      />

      <CheckboxControl
        label="Tylko z rabatem 🏷️"
        checked={filters.onlyDiscount}
        onChange={(value) => onFilterChange("onlyDiscount", value)}
      />
    </section>
  );
};
