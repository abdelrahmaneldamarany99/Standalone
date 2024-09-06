import { createContext, useReducer, useEffect } from "react";

type User = {
  email: string;
  password: string;
};
type Action = {
  type: string;
  payload: User;
};
type State = {
  users: User[];
};
type Context = {
  customers: User[] | null;
  dispatch: (arg0: Action) => void;
};

export const CustomersContext = createContext<Context | null>(null);
export const AuthContext = createContext<User | null>(null);

export const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: {},
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
