import {useContext} from 'react'
import { CustomersContext } from "../context/CustomersContext";
import { AuthContext } from "../context/AuthContext";

export const useSignout = () => {
  const { dispatch: dispatchCustomers} = useContext(CustomersContext)
  const {dispatch} = useContext(AuthContext)


  const signout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch signout action
    dispatch({ type: 'SIGNOUT' })
    dispatchCustomers({ type: 'GET_CUSTOMERS', payload: null })
  }

  return { signout }
}
