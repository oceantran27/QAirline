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
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(403).send({
        message: "Authorization token is required",
      });
    }

    const decodedToken = await auth.verifyIdToken(token);
    const verifiedId = decodedToken.uid;

    const docRef = doc(db, CUSTOMER_COLLECTION_NAME, verifiedId);
    const customerDoc = await getDoc(docRef);

    if (customerDoc.exists()) {
      res.status(200).send({
        message: "Customer fetched successfully",
        data: new Customer({ ...customerDoc.data() }),
      });
    } else {
      res.status(404).send({
        message: "Customer not found",
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const updateCurrentCustomer = async (req, res) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(403).send({
        message: "Authorization token is required",
      });
    }

    const decodedToken = await auth.verifyIdToken(token);
    const verifiedId = decodedToken.uid;

    const docRef = doc(db, CUSTOMER_COLLECTION_NAME, verifiedId);
    const customerDoc = await getDoc(docRef);

    if (!customerDoc.exists()) {
      return res.status(404).send({
        message: "Customer not found",
      });
    }

    const customerData = customerDoc.data();
    const verifiedEmail = customerData.email;
    const updateData = {
      ...customerData,
      ...req.body,
    };

    if (updateData.email !== verifiedEmail) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
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
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(403).send({
        message: "Authorization token is required",
      });
    }

    const decodedToken = await auth.verifyIdToken(token);
    const verifiedId = decodedToken.uid;

    const docRef = doc(db, CUSTOMER_COLLECTION_NAME, verifiedId);
    const customerDoc = await getDoc(docRef);

    if (!customerDoc.exists()) {
      return res.status(404).send({
        message: "Customer not found",
      });
    }

    const customerData = customerDoc.data();

    if (customerData.role !== "customer") {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    await deleteDoc(docRef);
    await auth.deleteUser(verifiedId);

    res.status(200).send({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
