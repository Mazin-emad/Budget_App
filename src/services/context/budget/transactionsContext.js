import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import {
  deleteTransactions,
  getTransactions,
} from "services/apis/transactions.api";

export const transactionsContext = createContext();

const initialState = {
  data: [],
  loading: true,
  error: null,
};

const contextReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const TransactionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  const [filters, setFilters] = useState({
    keys: null,
    category: null,
    type: null,
  });

  const isMount = useRef(false);

  const fetchData = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await getTransactions();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, []);

  const handelDelete = async (id) => {
    try {
      dispatch({ type: "FETCH_START" });
      await deleteTransactions(id);
      fetchData();
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    if (!isMount.current) {
      fetchData();
      isMount.current = true;
    }
  }, [fetchData]);

  const handelFilters = (filterData) => {
    setFilters(filterData);
  };

  const filterData = useMemo(() => {
    let tempData = [...state.data];
    if (filters.keys) {
      tempData = tempData.sort((a, b) => {
        if (filters.keys === "date") {
          return new Date(b.date) - new Date(a.date);
        }
        if (filters.keys === "amount") {
          return b.amount - a.amount;
        }
        return tempData;
      });
    }
    if (filters.category) {
      tempData = tempData.filter((item) => item.category === filters.category);
    }
    if (filters.type) {
      tempData = tempData.filter((item) => item.type === filters.type);
    }
    return tempData;
  }, [filters, state.data]);

  const totals = useMemo(() => {
    const income = state.data
      .filter((item) => item.type === "income")
      .reduce((acc, item) => acc + +item.amount, 0);
    const expanse = state.data
      .filter((item) => item.type === "expanse")
      .reduce((acc, item) => acc + +item.amount, 0);
    const balance = income - expanse;
    return { income, expanse, balance };
  }, [state.data]);

  return (
    <transactionsContext.Provider
      value={{
        ...state,
        totals,
        handelFilters,
        handelDelete,
        fetchData,
        filterData,
      }}
    >
      {children}
    </transactionsContext.Provider>
  );
};
