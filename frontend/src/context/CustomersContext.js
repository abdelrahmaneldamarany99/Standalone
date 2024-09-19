import { createContext, useReducer } from "react";

export const CustomersContext = createContext();

export const customersReducer = (state, action) => {
  switch (action.type) {
    case "GET_CUSTOMERS":
      return {
        customers: action.payload,
      };
    case "CREATE_CUSTOMER":
      return {
        customers: [action.payload, ...state.customers],
      };
    case "DELETE_CUSTOMER":
      return {
        customers: state.customers.filter(
          (customer) => customer._id !== action.payload._id
        ),
      };
    case "UPDATE_CUSTOMER":
      const newCustomers = state.customers.filter(
        (customer) => customer._id !== action.payload.customer._id
      );
      newCustomers.push(action.payload.customer);
      return {
        customers: newCustomers,
      };
    default:
      return state;
  }
};

export const CustomersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(customersReducer, {
    customers: null,
  });

  return (
    <CustomersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CustomersContext.Provider>
  );
};
