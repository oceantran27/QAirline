import {
  dbCreateCustomer,
  dbGetAllCustomers,
  dbGetCustomerById,
  dbUpdateCustomer,
  dbDeleteCustomer,
  dbChangePassword,
} from "../../services/users/customer.service";
import {
  userCache,
  setCache,
  getCache,
  deleteCache,
} from "../../cache/cacheManager";

export const createCustomer = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const newCustomer = await dbCreateCustomer({
      email,
      password,
      firstName,
      lastName,
    });
    const cachedCustomers = getCache(userCache, "customers");

    if (cachedCustomers) {
      cachedCustomers.push(newCustomer);
      setCache(userCache, "customers", cachedCustomers);
    }
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
    const cachedCustomers = getCache(userCache, "customers");
    if (cachedCustomers) {
      return res.status(200).send({
        message: "Customers fetched successfully",
        data: cachedCustomers,
      });
    }

    const customers = await dbGetAllCustomers();

    setCache(userCache, "customers", customers);

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
      const cachedUser = getCache(userCache, req.query.id);
      if (cachedUser) {
        return res.status(200).send({
          data: cachedUser,
        });
      }
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
      const cachedUser = getCache(userCache, req.query.id);
      if (cachedUser) {
        deleteCache(userCache, req.query.id);
      }
    }

    if (user.role === "customer") {
      await dbUpdateCustomer(user.uid, updateData);
      const cachedUser = getCache(userCache, user.uid);
      if (cachedUser) {
        deleteCache(userCache, user.uid);
      }
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

      const cachedUser = getCache(userCache, req.query.id);
      if (cachedUser) {
        deleteCache(userCache, req.query.id);
      }
    }

    if (user.role === "customer") {
      await dbDeleteCustomer(user.uid);

      const cachedUser = getCache(userCache, user.uid);
      if (cachedUser) {
        deleteCache(userCache, user.uid);
      }
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
