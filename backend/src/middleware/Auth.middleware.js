import admin from "../database/firebaseAdmin";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = admin.auth();
const CUSTOMER_COLLECTION_NAME = "customers";
const ADMIN_COLLECTION_NAME = "admins";

export const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(403).send({
        message: "Authorization token is required",
      });
    }
    const userCollectionName = req.url.includes("admin")
      ? ADMIN_COLLECTION_NAME
      : CUSTOMER_COLLECTION_NAME;
    // const userCollectionName = ADMIN_COLLECTION_NAME;

    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const userDocRef = doc(getFirestore(), userCollectionName, userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    req.user = { uid: userId, ...userDoc.data() };

    next();
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const checkAdminRole = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }
    next();
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
