import {
  dbCreateCustomer,
  dbGetAllCustomers,
  dbGetCustomerById,
  dbUpdateCustomer,
  dbDeleteCustomer,
  dbChangePassword,
} from "../../services/users/customer.service";

export const createCustomer = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    await dbCreateCustomer({ email, password, firstName, lastName });
    res.status(201).send({
      message: "Customer created successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await dbGetAllCustomers();
    res.status(200).send({
      message: "Customers fetched successfully",
      data: customers,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const user = req.user;
    var customer;

    if (user.role === "admin") {
      customer = await dbGetCustomerById(req.query.id);
    }

    if (user.role === "customer") {
      customer = user;
    }

    res.status(200).send({
      data: customer,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const user = req.user;

    let updateData = { ...req.body };

    if (user.role === "admin") {
      await dbUpdateCustomer(req.query.id, updateData);
    }

    if (user.role === "customer") {
      await dbUpdateCustomer(user.uid, updateData);
    }

    res.status(200).send({
      message: "Customer updated successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const user = req.user;

    if (user.role === "admin") {
      await dbDeleteCustomer(req.query.id);
    }

    if (user.role === "customer") {
      await dbDeleteCustomer(user.uid);
    }

    res.status(200).send({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const user = req.user;
    if (user.role === "admin") {
      await dbChangePassword(
        req.query.id,
        req.body.email,
        req.body.oldPassword,
        req.body.newPassword
      );
    }

    if (user.role === "customer") {
      await dbChangePassword(
        user.uid,
        req.body.email,
        req.body.oldPassword,
        req.body.newPassword
      );
    }
    res.status(200).send({
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
