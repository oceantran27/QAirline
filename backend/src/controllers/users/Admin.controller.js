import {
  dbCreateAdmin,
  dbGetAdminById,
  dbGetAllAdmins,
  dbUpdateAdmin,
  dbDeleteAdmin,
  dbChangePassword,
} from "../../services/users/admin.service";
import {
  userCache,
  setCache,
  getCache,
  deleteCache,
} from "../../cache/cacheManager";

export const createAdmin = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const newAdmin = await dbCreateAdmin({
      email,
      password,
      firstName,
      lastName,
    });
    const cachedAdmins = getCache(userCache, "admins");

    if (cachedAdmins) {
      cachedAdmins.push(newCustomer);
      setCache(userCache, "admins", cachedAdmins);
    }
    res.status(201).send({
      message: "Admin created successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const admin = req.user;
    res.status(200).send({
      message: "Admin fetched successfully",
      data: admin,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const cachedAdmins = getCache(userCache, "admins");
    if (cachedAdmins) {
      return res.status(200).send({
        message: "Customers fetched successfully",
        data: cachedAdmins,
      });
    }

    const admins = await dbGetAllAdmins();

    setCache(userCache, "admins", admins);

    res.status(200).send({
      message: "Admins fetched successfully",
      data: admins,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const id = req.user.uid;
    let updateData = { ...req.body };
    await dbUpdateAdmin(id, updateData);
    const cachedUser = getCache(userCache, id);
    if (cachedUser) {
      deleteCache(userCache, id);
    }
    res.status(200).send({
      message: "Admin updated successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const id = req.user.uid;
    await dbDeleteAdmin(id);
    const cachedUser = getCache(userCache, id);
    if (cachedUser) {
      deleteCache(userCache, id);
    }
    res.status(200).send({
      message: "Admin deleted successfully",
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
    await dbChangePassword(
      user.uid,
      req.body.email,
      req.body.oldPassword,
      req.body.newPassword
    );
    res.status(200).send({
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
