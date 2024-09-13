const express = require("express");
const {
  getCustomers,
  getCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../controllers/customerController");

const router = express.Router();

router.get("/customers", getCustomers);

router.get("/customers/:id", getCustomer);

router.post("/create", createCustomer);

router.delete("/delete/:id", deleteCustomer);

router.patch("/update/:id", updateCustomer);

// router.get("/searchcustomers", getSearchedCustomers);

//____________________________________________________

// router.get("/", function(req,res){getCustomers});

// router.get("/:id", function(req,res){getCustomer});

// router.post("/", function(req,res){createCustomer});

// router.delete("/:id", function(req,res){deleteCustomer});

// router.patch("/:id", function(req,res){updateCustomer});


module.exports = router;
