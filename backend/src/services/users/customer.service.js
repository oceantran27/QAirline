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
import firebase from "../../database/firebase";
import Customer from "../../models/users/customer.model";
import admin from "../../database/firebaseAdmin";

const db = getFirestore(firebase);
const auth = admin.auth();
const CUSTOMER_COLLECTION_NAME = "customers";

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

export const dbGetCustomerById = async (uid) => {
  try {
    const docRef = doc(db, CUSTOMER_COLLECTION_NAME, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return new Customer({ ...docSnap.data() });
    }
    throw new Error("Customer not found");
  } catch (error) {
    throw new Error(`Error getting customer by ID: ${error.message}`);
  }
};

export const dbCreateCustomer = async ({
  email,
  password,
  firstName,
  lastName,
}) => {
  try {
    const newCustomer = new Customer({ firstName, lastName, email });

    const user = await auth.createUser({
      email,
      password,
    });
    newCustomer.uid = user.uid;
    newCustomer.createdAt = new Date();
    newCustomer.updatedAt = new Date();

    const customerRef = doc(db, CUSTOMER_COLLECTION_NAME, user.uid);
    await setDoc(customerRef, { ...newCustomer });

    return newCustomer;
  } catch (error) {
    throw new Error(`Error creating customer: ${error.message}`);
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
    const docRef = doc(db, CUSTOMER_COLLECTION_NAME, uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Customer not found");
    }

    await auth.deleteUser(uid);
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error(`Error deleting customer: ${error.message}`);
  }
};
