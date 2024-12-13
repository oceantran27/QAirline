import firebase from "../../database/firebase";
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
import Admin from "../../models/users/admin.model";

const db = getFirestore(firebase);
const auth = admin.auth();
const ADMIN_COLLECTION_NAME = "admins";

// Tạo admin mới với quyền hạn
export const dbCreateMockAdmin = async ({
  email,
  password,
  firstName,
  lastName,
  permissions,
}) => {
  try {
    const user = await auth.createUser({
      email,
      password,
    });

    const newAdmin = new Admin({ firstName, lastName, email, permissions });
    newAdmin.uid = user.uid;
    newAdmin.createdAt = new Date();
    newAdmin.updatedAt = new Date();

    const adminRef = doc(db, ADMIN_COLLECTION_NAME, user.uid);
    await setDoc(adminRef, { ...newAdmin });

    return newAdmin;
  } catch (error) {
    throw new Error(`Error creating mock admin: ${error.message}`);
  }
};

export const dbCreateAdmin = async ({
  email,
  password,
  firstName,
  lastName,
}) => {
  try {
    const user = await auth.createUser({
      email,
      password,
    });

    const newAdmin = new Admin({ firstName, lastName, email });
    newAdmin.uid = user.uid;
    newAdmin.createdAt = new Date();
    newAdmin.updatedAt = new Date();

    const adminRef = doc(db, ADMIN_COLLECTION_NAME, user.uid);
    await setDoc(adminRef, { ...newAdmin });

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
      return new Admin({ ...docSnap.data() });
    }
    throw new Error("Admin not found");
  } catch (error) {
    throw new Error(`Error getting admin by ID: ${error.message}`);
  }
};

export const dbGetAllAdmins = async () => {
  try {
    const snapshot = await getDocs(collection(db, ADMIN_COLLECTION_NAME));
    const admins = snapshot.docs.map((doc) => new Admin({ ...doc.data() }));
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
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Admin not found");
    }

    await deleteDoc(docRef);
    await auth.deleteUser(uid);
  } catch (error) {
    throw new Error(`Error deleting admin: ${error.message}`);
  }
};
