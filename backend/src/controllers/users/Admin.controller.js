import {
  dbCreateAdmin,
  dbGetAdminById,
  dbGetAllAdmins,
  dbUpdateAdmin,
  dbDeleteAdmin,
  dbChangePassword,
} from "../../services/users/admin.service";

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
    const id = req.user.uid;
    console.log(id);
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
    const id = req.user.uid;
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
