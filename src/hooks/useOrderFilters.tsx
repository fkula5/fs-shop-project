import { useState, useMemo } from "react";
import type { Order } from "../types";
import { pipe } from "../utils";
import {
  filterByStatus,
  filterHighValueOrders,
  filterByCategory,
  filterByCustomer,
  filterWithDiscount,
  sortByValueDesc,
  sortByValueAsc,
  getUniqueCustomerIds,
  getAllCategories,
  calculateStatistics,
} from "../logic";

export interface FilterState {
  status: Order["status"] | "all";
  minPrice: number;
  category: string;
  customer: string;
  onlyDiscount: boolean;
  sortOrder: "asc" | "desc" | "none";
}

export const useOrderFilters = (orders: ReadonlyArray<Order>) => {
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    minPrice: 0,
    category: "all",
    customer: "all",
    onlyDiscount: false,
    sortOrder: "none",
  });

  const uniqueCustomers = useMemo(
    () => getUniqueCustomerIds()(orders),
    [orders]
  );

  const allCategories = useMemo(() => getAllCategories()(orders), [orders]);

  const processedOrders = useMemo(() => {
    return pipe(
      orders,
      filters.status !== "all" ? filterByStatus(filters.status) : (x) => x,
      filterHighValueOrders(filters.minPrice),
      filters.category !== "all"
        ? filterByCategory(filters.category as Order["items"][0]["category"])
        : (x) => x,
      filters.customer !== "all"
        ? filterByCustomer(filters.customer)
        : (x) => x,
      filters.onlyDiscount ? filterWithDiscount() : (x) => x,
      filters.sortOrder === "desc"
        ? sortByValueDesc()
        : filters.sortOrder === "asc"
        ? sortByValueAsc()
        : (x) => x
    );
  }, [
    orders,
    filters.status,
    filters.minPrice,
    filters.category,
    filters.customer,
    filters.onlyDiscount,
    filters.sortOrder,
  ]);

  const stats = useMemo(
    () => calculateStatistics(processedOrders),
    [processedOrders]
  );

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      status: "all",
      minPrice: 0,
      category: "all",
      customer: "all",
      onlyDiscount: false,
      sortOrder: "none",
    });
  };

  return {
    filters,
    processedOrders,
    stats,
    uniqueCustomers,
    allCategories,
    updateFilter,
    resetFilters,
  };
};
