import {
  dbCreateCustomer,
  dbGetAllCustomers,
  dbGetCustomerById,
  dbUpdateCustomer,
  dbDeleteCustomer,
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
    const reqUid = req.query.id;
    const user = req.user;

    if (reqUid && user.role !== "admin" && user.uid !== reqUid) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    if (!reqUid) {
      return res.status(200).send({
        data: new Customer({ ...user }),
      });
    }

    const customer = await dbGetCustomerById(reqUid);
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
    if (user.role !== "admin" && user.uid !== req.query.id) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    let updateData = { ...req.body };

    await dbUpdateCustomer(req.query.id, updateData);

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
    if (user.role !== "admin" && user.uid !== req.query.id) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    await dbDeleteCustomer(req.query.id);

    res.status(200).send({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
