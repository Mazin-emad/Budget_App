import {
  createContext,
  useCallback,
  useEffect,
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
    date: false,
    amount: false,
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

  const handeleFilters = (filterData) => {
    const fData = { ...filters };

    Object.keys(filterData).forEach((key) => {
      if (key === "keys") {
        if (!filterData.keys) {
          fData.date = false;
          fData.amount = false;
        } else if (filterData.keys === "amount") {
          fData.amount = true;
        } else if (filterData.keys === "type") {
          fData.type = true;
        }
      } else if (key === "type") {
        fData.type = filterData.type ? filterData.type : null;
      }
    });
  };

  return (
    <transactionsContext.Provider value={{ ...state, handelDelete, fetchData }}>
      {children}
    </transactionsContext.Provider>
  );
};
