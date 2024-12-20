import firebase from "../../database/firebase.js";
import admin from "../../database/firebaseAdmin.js";
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
import Admin from "../../models/users/admin.model.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseAuth = getAuth(firebase);

const db = getFirestore(firebase);
const auth = admin.auth();
const ADMIN_COLLECTION_NAME = "admins";

export const dbCreateAdmin = async ({
  email,
  password,
  firstName,
  lastName,
}) => {
  try {
    const userPromise = auth.createUser({ email, password });
    const newAdmin = {
      firstName,
      lastName,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = await userPromise;
    newAdmin.uid = user.uid;
    const adminRef = doc(db, ADMIN_COLLECTION_NAME, user.uid);
    await setDoc(adminRef, newAdmin);

    return newAdmin;
  } catch (error) {
    throw new Error(`Error creating admin: ${error.message}`);
  }
};

export const dbGetAdminById = async (uid) => {
  try {
    const docRef = doc(db, ADMIN_COLLECTION_NAME, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const adminData = new Admin({ ...docSnap.data() });
      return adminData;
    }
    throw new Error("Admin not found");
  } catch (error) {
    throw new Error(`Error getting admin by ID: ${error.message}`);
  }
};

export const dbGetAllAdmins = async () => {
  try {
    const snapshot = await getDocs(collection(db, ADMIN_COLLECTION_NAME));
    const admins = snapshot.docs.map((doc) => doc.data());
    return admins;
  } catch (error) {
    throw new Error(`Error getting all admins: ${error.message}`);
  }
};

export const dbUpdateAdmin = async (uid, updateData) => {
  try {
    const fieldsToRemove = ["uid", "email", "createdAt", "updatedAt"];
    fieldsToRemove.forEach((field) => delete updateData[field]);

    updateData.updatedAt = new Date();

    const docRef = doc(db, ADMIN_COLLECTION_NAME, uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Admin not found");
    }

    await updateDoc(docRef, updateData);
  } catch (error) {
    throw new Error(`Error updating admin: ${error.message}`);
  }
};

export const dbDeleteAdmin = async (uid) => {
  try {
    const docRef = doc(db, ADMIN_COLLECTION_NAME, uid);

    const deleteAdminPromise = deleteDoc(docRef);
    const deleteUserPromise = auth.deleteUser(uid);

    await Promise.all([deleteAdminPromise, deleteUserPromise]);
  } catch (error) {
    throw new Error(`Error deleting admin: ${error.message}`);
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
    await auth.updateUser(uid, {
      password: newPassword,
    });
  } catch (error) {
    throw new Error(`Error changing password: ${error.message}`);
  }
};
