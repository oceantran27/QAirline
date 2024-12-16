import firebase from "../../database/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  dbCreateCustomer,
  dbGetCustomerById,
} from "../../services/users/customer.service";

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
