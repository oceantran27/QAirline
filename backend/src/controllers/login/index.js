import firebase from "../../database/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebase);

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const idToken = await user.getIdToken();

    res.status(200).send({
      message: "Login successful",
      token: idToken,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
