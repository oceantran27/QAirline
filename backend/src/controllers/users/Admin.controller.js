import firebase from "../../database/firebase";
import Admin from "../../models/users/Admin.model";
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

const adminCollection = "admins";

export const createAdmin = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newAdmin = new Admin(data);
    await addDoc(collection(db, adminCollection), { ...newAdmin });
    res.status(201).send("Admin created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getAdmins = async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, adminCollection));
    const admins = snapshot.docs.map(
      (doc) => new Admin({ id: doc.id, ...doc.data() })
    );
    res.status(200).send(admins);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const docRef = doc(db, adminCollection, id);
    const admin = await getDoc(docRef);
    if (admin.exists()) {
      res.status(200).send(new Admin({ id: admin.id, ...admin.data() }));
    } else {
      res.status(404).send("Admin not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const docRef = doc(db, adminCollection, id);
    await updateDoc(docRef, data);
    res.status(200).send("Admin updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const docRef = doc(db, adminCollection, id);
    await deleteDoc(docRef);
    res.status(200).send("Admin deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
