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
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(403).send({
        message: "Authorization token is required",
      });
    }

    const decodedToken = await auth.verifyIdToken(token);
    const verifiedId = decodedToken.uid;

    const docRef = doc(db, ADMIN_COLLECTION_NAME, verifiedId);
    const adminDoc = await getDoc(docRef);

    if (!adminDoc.exists() || adminDoc.data().role !== "admin") {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

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

export const getCurrentAdmin = async (req, res) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(403).send({
        message: "Authorization token is required",
      });
    }

    const decodedToken = await auth.verifyIdToken(token);
    const verifiedId = decodedToken.uid;

    const docRef = doc(db, ADMIN_COLLECTION_NAME, verifiedId);
    const adminDoc = await getDoc(docRef);

    if (adminDoc.exists()) {
      res.status(200).send({
        message: "Admin fetched successfully",
        data: new Admin({ ...adminDoc.data() }),
      });
    } else {
      res.status(404).send({
        message: "Admin not found",
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(403).send({
        message: "Authorization token is required",
      });
    }

    const decodedToken = await auth.verifyIdToken(token);
    const verifiedId = decodedToken.uid;

    const docRef = doc(db, ADMIN_COLLECTION_NAME, verifiedId);
    const adminDoc = await getDoc(docRef);

    if (!adminDoc.exists() || adminDoc.data().role !== "admin") {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

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
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(403).send({
        message: "Authorization token is required",
      });
    }

    const decodedToken = await auth.verifyIdToken(token);
    const verifiedId = decodedToken.uid;

    const docRef = doc(db, ADMIN_COLLECTION_NAME, verifiedId);
    const adminDoc = await getDoc(docRef);

    if (!adminDoc.exists() || adminDoc.data().role !== "admin") {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

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
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(403).send({
        message: "Authorization token is required",
      });
    }

    const decodedToken = await auth.verifyIdToken(token);
    const verifiedId = decodedToken.uid;

    const docRef = doc(db, ADMIN_COLLECTION_NAME, verifiedId);
    const adminDoc = await getDoc(docRef);

    if (!adminDoc.exists()) {
      return res.status(404).send({
        message: "Admin not found",
      });
    }

    const adminData = adminDoc.data();
    const verifiedEmail = adminData.email;

    const adminEmail = req.body.email;

    if (adminEmail !== verifiedEmail) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    const data = req.body;
    await updateDoc(docRef, data);

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
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(403).send({
        message: "Authorization token is required",
      });
    }

    const decodedToken = await auth.verifyIdToken(token);
    const verifiedId = decodedToken.uid;

    const docRef = doc(db, ADMIN_COLLECTION_NAME, verifiedId);
    const adminDoc = await getDoc(docRef);

    if (!adminDoc.exists()) {
      return res.status(404).send({
        message: "Admin not found",
      });
    }

    const adminData = adminDoc.data();

    if (adminData.role !== "admin") {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    await deleteDoc(docRef);
    await auth.deleteUser(verifiedId);

    res.status(200).send({
      message: "Admin deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
