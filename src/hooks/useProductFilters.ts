import { useState, useMemo, useEffect } from "react";
import { Product } from "../types";
import { SORT_OPTIONS } from '../constants';

// grab all products and filter/sort them
export const useProductFilters = (products: Product[]) => {
  const [sortBy, setSortBy] = useState("name-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // filter by search text if any
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query)
      );
    }

    // sort what's left
    switch (sortBy) {
      case SORT_OPTIONS.NAME_ASC:
        return result.sort((a, b) => a.name.localeCompare(b.name));
      case SORT_OPTIONS.NAME_DESC:
        return result.sort((a, b) => b.name.localeCompare(a.name));
      case SORT_OPTIONS.PRICE_ASC:
        return result.sort((a, b) => a.price - b.price);
      case SORT_OPTIONS.PRICE_DESC:
        return result.sort((a, b) => b.price - a.price);
      case SORT_OPTIONS.STOCK_ASC:
        return result.sort((a, b) => a.inStock - b.inStock);
      case SORT_OPTIONS.STOCK_DESC:
        return result.sort((a, b) => b.inStock - a.inStock);
      default:
        return result;
    }
  }, [products, sortBy, searchQuery]);

  return {
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    filteredAndSortedProducts,
    isLoading,
  };
}; 