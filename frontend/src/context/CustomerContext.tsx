import React from 'react'
import { createContext, useReducer } from 'react'
import {Customer} from '../components/Customer/Customer'

type Action ={
  type:string
  payload:Customer
}
type State={
  customers:Customer[]
}
type Context={
  customers:Customer[] | any
  dispatch:(arg: Action)=>void
}

export const CustomersContext = createContext<Context | null>(null)


export const customersReducer = (state:State, action:Action) => {
  switch (action.type) {
    case 'SET_CUSTOMER': 
      return {
        customers: action.payload
      }
    case 'CREATE_CUSTOMER':
      return {
        customers: [action.payload, ...state.customers]
      }
    case 'DELETE_CUSTOMER':
      return {
        customers: state.customers.filter((customer:Customer) => customer._id !== action.payload._id)
      }
    default:
      return state
  }
}
type CustomersContextProviderProps={
  children:React.ReactNode
}
export const CustomersContextProvider = ({ children }:CustomersContextProviderProps) => {
  const [state, dispatch] = useReducer<State | null | any>(customersReducer, {
    customers: null
  })

  return (
    <CustomersContext.Provider value={{...state, dispatch}}>
      { children }
    </CustomersContext.Provider>
  )
}

