import { useStorageReducer } from "react-storage-hooks";
const reducer = (state, action) => {
  switch (action.type) {
    case "setValue":
      return {
        ...state,
        changes: {
          ...state.changes,
          [action.key]: action.value,
        },
      };
    case "reset":
      return {
        ...state,
        changes: {},
      };
    default:
      return state;
  }
};
const initialState = {
  changes: {},
};
const useBudgetReducer = (key) => {
  const [state, dispatch] = useStorageReducer(
    localStorage,
    `${key} Police Budget`,
    reducer,
    initialState
  );
  const setValue = (key) => (value) => {
    dispatch({
      type: "setValue",
      key,
      value,
    });
  };

  const reset = () => {
    dispatch({
      type: "reset",
    });
  };

  return { state, setValue, reset };
};

export default useBudgetReducer;
