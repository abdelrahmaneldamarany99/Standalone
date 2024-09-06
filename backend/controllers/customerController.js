const mongoose = require("mongoose");
const CustomerModel = require("../models/Customer");

const getCustomers = async (req, res) => {
  const customers = await CustomerModel.find();

  res.status(200).json(customers);
};

const getCustomer = async (req, res) => {
  const { id } = req.params;

  const customer = await CustomerModel.findById(id);

  if (!customer) {
    return res.status(404).json({ error: "customer does not exist" });
  }

  res.status(200).json(customer);
};

const createCutomer = async (req, res) => {
  const { name, email, contact, number, storeName, address } = req.body;

  if (
    !(
      name.trim() ||
      email.trim() ||
      contact.trim() ||
      storeName.trim() ||
      address.trim() ||
      number
    )
  ) {
    return res
      .status(400)
      .json({ error: "All fields required,please fill them", emptyFields });
  }

  try {
    const customer = await CustomerModel.create({
      name,
      email,
      contact,
      number,
      storeName,
      address,
    });
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCutomer = async (req, res) => {
  const { id } = req.params;

  const customer = await CustomerModel.findOneAndDelete({ _id: id });

  if (!customer) {
    return res.status(400).json({ error: "customer does not exist" });
  }

  res.status(200).json(customer);
};

const updateCutomer = async (req, res) => {
  const { id } = req.params;

  const customer = await CustomerModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!customer) {
    return res.status(400).json({ error: "customer does not exist" });
  }

  res.status(200).json(customer);
};

module.exports = {
  getCustomers,
  getCustomer,
  createCutomer,
  deleteCutomer,
  updateCutomer,
};
