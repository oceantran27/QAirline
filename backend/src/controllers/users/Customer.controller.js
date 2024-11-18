import firebase from "../../database/firebase";
import { Customer } from "../../models/users/Customer.model";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(firebase);

const customerCollection = "customers";

export const createCustomer = async (req, res) => {
  try {
    const data = req.body;
    const newCustomer = new Customer(data);
    await addDoc(collection(db, customerCollection), { ...newCustomer });
    res.status(201).send("Customer created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getCustomers = async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, customerCollection));
    const customers = snapshot.docs.map(
      (doc) => new Customer({ id: doc.id, ...doc.data() })
    );
    res.status(200).send(customers);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const id = req.params.id;
    const docRef = doc(db, customerCollection, id);
    const customer = await getDoc(docRef);
    if (customer.exists()) {
      res
        .status(200)
        .send(new Customer({ id: customer.id, ...customer.data() }));
    } else {
      res.status(404).send("Customer not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const docRef = doc(db, customerCollection, id);
    await updateDoc(docRef, data);
    res.status(200).send("Customer updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const docRef = doc(db, customerCollection, id);
    await deleteDoc(docRef);
    res.status(200).send("Customer deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
