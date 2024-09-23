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
        (customer) => customer._id !== action.payload._id
      )
      newCustomers.push(action.payload);
      return {
        customers: newCustomers,
      };
      case "SEARCH_CUSTOMERS":
      return {
        customers: state.customers.filter(
          (customer) =>
            new RegExp(action.payload, "ig").test(customer.name) ||
            new RegExp(customer.name, "ig").test(action.payload)
        )
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
