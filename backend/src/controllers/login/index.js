import firebase from "../../database/firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  dbCreateCustomer,
  dbGetCustomerById,
} from "../../services/users/customer.service.js";

import { dbGetAdminById } from "../../services/users/admin.service.js";

const firebaseAuth = getAuth(firebase);

export const handleLogin = async (req, res) => {
  try {
    const { email, password, provider } = req.body;

    let user;
    if (provider === "google") {
      const googleProvider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(
        firebaseAuth,
        googleProvider
      );
      user = userCredential.user;
      console.log(user);
      try {
        await dbGetCustomerById(user.uid);
      } catch (error) {}
    } else {
      if (!email || !password) {
        return res.status(400).send("Email and password are required");
      }
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      user = userCredential.user;
    }

    const idToken = await user.getIdToken();

    res.status(200).send({
      message: "Login successful",
      token: idToken,
      provider: provider || "email",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const handleCustomerLogin = async (req, res) => {
  try {
    const { email, password, provider } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user = userCredential.user;
    const userId = user.uid;

    const promiseGetCustomer = await dbGetCustomerById(userId);
    const promiseGetIdToken = await user.getIdToken();
    const [customer, idToken] = await Promise.all([
      promiseGetCustomer,
      promiseGetIdToken,
    ]);
    res.status(200).send({
      message: "Login successful",
      token: idToken,
      provider: provider || "email",
    });
  } catch (error) {
    res.status(400).send({
      message: "Email or password is incorrect",
    });
  }
};

export const handleAdminLogin = async (req, res) => {
  try {
    const { email, password, provider } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user = userCredential.user;
    const userId = user.uid;
    const promiseGetAdmin = await dbGetAdminById(userId);
    const promiseGetIdToken = await user.getIdToken();

    const [admin, idToken] = await Promise.all([
      promiseGetAdmin,
      promiseGetIdToken,
    ]);

    res.status(200).send({
      message: "Login successful",
      token: idToken,
      provider: provider || "email",
    });
  } catch (error) {
    res.status(400).send({
      message: "Email or password is incorrect",
    });
  }
};
