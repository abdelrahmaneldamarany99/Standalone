import { useEffect }from 'react'
import { useCustomersContext } from "../../hooks/useCustomersContext"
import { useAuthContext } from "../../hooks/useAuthContext"

import Customer, { CustomerType }  from '../Customer/Customer'
import CustomerForm from '../CustomerForm/CustomerForm'

 
const Customers = () => {
  const {customers, dispatch} = useCustomersContext()
  const {user} = useAuthContext()
  const url = "http://localhost:5173";


  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch(`${url}/customers`)
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_CUSTOMERS', payload: json})
      }
    }

    if (user) {
        fetchCustomers()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="customers">
        {customers && customers.map((customer:CustomerType) => (
          <Customer key={customer._id} customer={customer} />
        ))}
      </div>
      <CustomerForm />
    </div>
  )
}

export default Customers