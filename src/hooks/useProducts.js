import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsSuccess,
  fetchProductsFailure,
  setLoading,
} from "../slices/productsSlice";

const useProducts = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const [filteredItems, setFilteredItems] = useState([]);
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading());
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        dispatch(fetchProductsSuccess(data));
        setFilteredItems(data);
      } catch (err) {
        dispatch(fetchProductsFailure(err.message));
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleSearch = (query) => {
    setQuery(query);
    setHasSearched(true);
    setCurrentPage(1);

    if (query.trim() === "") {
      setFilteredItems(items);
      setHasSearched(false);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = items.filter((product) =>
        Object.values(product).some((value) =>
          value.toString().toLowerCase().includes(lowercasedQuery)
        )
      );
      setFilteredItems(filtered);
    }
  };

  const handleSort = (order) => {
    const sortedItems = [...filteredItems].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredItems(sortedItems);
  };

  const handleReset = () => {
    setFilteredItems(items);
    setQuery("");
    setHasSearched(false);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return {
    items,
    filteredItems,
    status,
    error,
    query,
    hasSearched,
    currentPage,
    paginatedItems,
    totalPages,
    handleSearch,
    handleSort,
    handleReset,
    handlePageChange,
  };
};

export default useProducts;
