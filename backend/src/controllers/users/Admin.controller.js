import {
  dbCreateMockAdmin,
  dbCreateAdmin,
  dbGetAdminById,
  dbGetAllAdmins,
  dbUpdateAdmin,
  dbDeleteAdmin,
} from "../../services/users/admin.service";

export const createMockAdmin = async (req, res) => {
  try {
    const { email, password, firstName, lastName, permissions } = req.body;
    await dbCreateMockAdmin({
      email,
      password,
      firstName,
      lastName,
      permissions,
    });
    res.status(201).send({
      message: "Admin created successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    await dbCreateAdmin({ email, password, firstName, lastName });
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
    const reqId = req.query.id;
    const admin = await dbGetAdminById(reqId);
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
    const admins = await dbGetAllAdmins();
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
    const { id } = req.query;
    let updateData = { ...req.body };
    await dbUpdateAdmin(id, updateData);
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
    const { id } = req.query;
    await dbDeleteAdmin(id);
    res.status(200).send({
      message: "Admin deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
