import firebase from "../../database/firebase";
import Customer from "../../models/users/customer.model";
import admin from "../../database/firebaseAdmin";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(firebase);
const auth = admin.auth();

const CUSTOMER_COLLECTION_NAME = "customers";

export const createCustomer = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await auth.createUser({
      email,
      password,
    });

    const newCustomer = new Customer({ firstName, lastName, email });
    newCustomer.createdAt = new Date();
    newCustomer.updatedAt = new Date();

    const customerRef = doc(db, CUSTOMER_COLLECTION_NAME, user.uid);
    await setDoc(customerRef, { ...newCustomer });
    res.status(201).send({
      message: "Customer created successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getCurrentCustomer = async (req, res) => {
  try {
    res.status(200).send({
      message: "Customer fetched successfully",
      data: req.user,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const updateCurrentCustomer = async (req, res) => {
  try {
    const user = req.user;
    const docRef = doc(db, CUSTOMER_COLLECTION_NAME, user.uid);
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
      message: "Customer updated successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const deleteCurrentCustomer = async (req, res) => {
  try {
    const user = req.user;
    const docRef = doc(db, CUSTOMER_COLLECTION_NAME, user.uid);

    await deleteDoc(docRef);
    await auth.deleteUser(user.uid);

    res.status(200).send({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
