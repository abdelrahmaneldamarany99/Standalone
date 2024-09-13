import { SetStateAction } from "react";

export type EventType={
   preventDefault: () => void
  }
export type StateType = {
  users: UserType[];
};

export type UserType = {
  email: string;
  password: string;
  // user?: {};
};
export type AuthContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<never[]>> | any;
  // setUser:React.Dispatch<React.SetStateAction<never[]>>;
};
export type AuthContextProviderPropsType = {
  children: React.ReactNode;
};

export type CustomersType = CustomerType[];

export type CustomersContextType = {
  customers: CustomersType | any;
  setCustomers: React.Dispatch<SetStateAction<CustomerType[]>>;

};

export type CustomersContextProviderPropsType = {
  children: React.ReactNode;
};

export type CustomerType = {
  _id: string;
  name: string;
  email: string;
  contact: string;
  number: number;
  storeName: string;
  address: string;
  // customer: any;
  // data?: {};
};

export type CustomerPropsType = {
  customer: CustomerType;
};
