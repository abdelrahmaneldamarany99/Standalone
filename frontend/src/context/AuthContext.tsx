import { createContext, useEffect, useState } from "react";
import { AuthContextProviderProps, AuthContextType, UserType } from "../Types/types";


export const AuthContext = createContext<AuthContextType | null>(null);

// export const authReducer = (state: State, action: Action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return { user: action.payload };
//     case "LOGOUT":
//       return { user: null };
//     default:
//       return state;
//   }
// };



export const AuthContextProvider = ({ children }:AuthContextProviderProps) => {
  // const [state, dispatch] = useReducer(authReducer, {
  //   user: null,
  // });
  const [user,setUser]=useState<UserType | null>(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      // dispatch({ type: "LOGIN", payload: user });
      setUser(user)
    }
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
