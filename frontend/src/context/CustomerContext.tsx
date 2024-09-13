import React, { useState } from "react";
import { createContext } from "react";
import { CustomersContextType, CustomerType, CustomersContextProviderProps } from "../Types/types";

export const CustomersContext = createContext<CustomersContextType | []>([]);

export const CustomersContextProvider = ({
  children,
}: CustomersContextProviderProps) => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  return (
    <CustomersContext.Provider value={{ customers, setCustomers }}>
      {children}
    </CustomersContext.Provider>
  );
};

