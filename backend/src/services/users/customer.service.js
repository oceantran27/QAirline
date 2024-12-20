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
import firebase from "../../database/firebase.js";
import Customer from "../../models/users/Customer.model.js";
import admin from "../../database/firebaseAdmin.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const db = getFirestore(firebase);
const adminAuth = admin.auth();
const CUSTOMER_COLLECTION_NAME = "customers";
const firebaseAuth = getAuth(firebase);

export const dbCreateCustomer = async ({
  email,
  password,
  firstName,
  lastName,
}) => {
  try {
    const userPromise = adminAuth.createUser({ email, password });
    const newCustomer = new Customer({ firstName, lastName, email });
    newCustomer.createdAt = new Date();
    newCustomer.updatedAt = new Date();

    const user = await userPromise;
    newCustomer.uid = user.uid;
    const customerRef = doc(db, CUSTOMER_COLLECTION_NAME, user.uid);
    await setDoc(customerRef, { ...newCustomer });

    return newCustomer;
  } catch (error) {
    throw new Error(`Error creating customer: ${error.message}`);
  }
};

export const dbGetCustomerById = async (uid) => {
  try {
    const docRef = doc(db, CUSTOMER_COLLECTION_NAME, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const customer = new Customer({ ...docSnap.data() });
      return customer;
    }

    throw new Error("Customer not found");
  } catch (error) {
    throw new Error(`Error getting customer by ID: ${error.message}`);
  }
};

export const dbGetAllCustomers = async () => {
  try {
    const snapshot = await getDocs(collection(db, CUSTOMER_COLLECTION_NAME));
    const customers = snapshot.docs.map(
      (doc) => new Customer({ ...doc.data() })
    );
    return customers;
  } catch (error) {
    throw new Error(`Error getting all customers: ${error.message}`);
  }
};

export const dbUpdateCustomer = async (uid, updateData) => {
  try {
    const fieldsToRemove = ["uid", "email", "createdAt", "updatedAt"];
    fieldsToRemove.forEach((field) => delete updateData[field]);

    updateData.updatedAt = new Date();

    const docRef = doc(db, CUSTOMER_COLLECTION_NAME, uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Customer not found");
    }

    await updateDoc(docRef, updateData);
  } catch (error) {
    throw new Error(`Error updating customer: ${error.message}`);
  }
};

export const dbDeleteCustomer = async (uid) => {
  try {
    const customerRef = doc(db, CUSTOMER_COLLECTION_NAME, uid);

    await Promise.all([adminAuth.deleteUser(uid), deleteDoc(customerRef)]);
  } catch (error) {
    throw new Error(`Error deleting customer: ${error.message}`);
  }
};

export const dbChangePassword = async (
  uid,
  email,
  oldPassword,
  newPassword
) => {
  try {
    await signInWithEmailAndPassword(firebaseAuth, email, oldPassword);
    await adminAuth.updateUser(uid, {
      password: newPassword,
    });
  } catch (error) {
    throw new Error(`Error changing password: ${error.message}`);
  }
};
