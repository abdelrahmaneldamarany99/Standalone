const Customer = require('../models/customerModel')
const mongoose = require('mongoose')

// get all customers
const getCustomers = async (req, res) => {
  const user_id = req.user._id

  const customers = await Customer.find({user_id}).sort({createdAt: -1})

  res.status(200).json(customers)
}

// get just one customer
const getCustomer = async (req, res) => {
  const { _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({error: "customer doesn't exist"})
  }

  const customer = await Customer.findById(_id)

  if (!customer) {
    return res.status(404).json({error: "customer doesn't exist"})
  }
  
  res.status(200).json(customer)
}


// create new customer
const createCustomer = async (req, res) => {
  const { name, email, address, number, storeName } = req.body

  // let emptyFields = []

  // if(!name) {
  //   emptyFields.push('name')
  // }
  // if(!email) {
  //   emptyFields.push('email')
  // }
  // if(!address) {
  //   emptyFields.push('address')
  // }
  if(!(name.trim() && email.trim() && address.trim() && number && storeName.trim())) {
    return res.status(400).json({ error: 'Please fill in all the fields' })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const customer = await Customer.create({...req.body, user_id})
    res.status(200).json(customer)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a customer
const deleteCustomer = async (req, res) => {
  const { _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({error: "customer doesn't exist"})
  }

  const customer = await Customer.findOneAndDelete({_id})

  if (!customer) {
    return res.status(400).json({error: "customer doesn't exist"})
  }

  res.status(200).json(customer)
}

// update a customer
const updateCustomer = async (req, res) => {
  const { _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({error: "customer doesn't exist"})
  }

  const customer = await Customer.findOneAndUpdate({_id}, {
    ...req.body
  })

  if (!customer) {
    return res.status(400).json({error: "customer doesn't exist"})
  }

  res.status(200).json(customer)
}


module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer
}