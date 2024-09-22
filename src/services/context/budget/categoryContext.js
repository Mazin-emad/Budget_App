import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";

import { getCategory } from "services/apis/categories.api";

export const categoryContext = createContext();

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

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  const isMount = useRef(false);

  const fetchData = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await getCategory();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, []);

  useEffect(() => {
    if (!isMount.current) {
      fetchData();
      isMount.current = true;
    }
  }, [fetchData]);

  return (
    <categoryContext.Provider value={{ ...state }}>
      {children}
    </categoryContext.Provider>
  );
};
