import firebase from "../../database/firebase";
import Admin from "../../models/users/admin.model";
import Customer from "../../models/users/customer.model";
import admin from "../../database/firebaseAdmin";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(firebase);
const auth = admin.auth();

const ADMIN_COLLECTION_NAME = "admins";
const CUSTOMER_COLLECTION_NAME = "customers";

export const createMockAdmin = async (req, res) => {
  try {
    const { email, password, firstName, lastName, permissions } = req.body;
    const user = await auth.createUser({
      email,
      password,
    });

    const newAdmin = new Admin({ firstName, lastName, email, permissions });
    newAdmin.createdAt = new Date();
    newAdmin.updatedAt = new Date();

    const adminRef = doc(db, ADMIN_COLLECTION_NAME, user.uid);
    await setDoc(adminRef, { ...newAdmin });
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
    const user = await auth.createUser({
      email,
      password,
    });

    const newAdmin = new Admin({ firstName, lastName, email });
    newAdmin.createdAt = new Date();
    newAdmin.updatedAt = new Date();

    const adminRef = doc(db, ADMIN_COLLECTION_NAME, user.uid);
    await setDoc(adminRef, { ...newAdmin });
    res.status(201).send({
      message: "Admin created successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getCurrentAdmin = async (req, res) => {
  try {
    res.status(200).send({
      message: "Admin fetched successfully",
      data: req.user,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, CUSTOMER_COLLECTION_NAME));
    const customers = snapshot.docs.map(
      (doc) => new Customer({ id: doc.id, ...doc.data() })
    );
    return res.status(200).send({
      message: "Customers fetched successfully",
      data: customers,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, ADMIN_COLLECTION_NAME));
    const admins = snapshot.docs.map(
      (doc) => new Admin({ id: doc.id, ...doc.data() })
    );
    return res.status(200).send({
      message: "Admins fetched successfully",
      data: admins,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const updateCurrentAdmin = async (req, res) => {
  try {
    const user = req.user;
    const docRef = doc(db, ADMIN_COLLECTION_NAME, user.uid);
    const updateData = {
      ...user,
      ...req.body,
    };

    if (updateData.email !== user.email) {
      return res.status(400).send({
        message: "Email cannot be changed",
      });
    }

    await updateDoc(docRef, updateData);
    res.status(200).send({
      message: "Admin updated successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const deleteCurrentAdmin = async (req, res) => {
  try {
    console.log(req.user);
    const user = req.user;
    const docRef = doc(db, ADMIN_COLLECTION_NAME, user.uid);

    await deleteDoc(docRef);
    await auth.deleteUser(user.uid);

    res.status(200).send({
      message: "Admin deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
