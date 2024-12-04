import { initializeApp } from "firebase/app";
import config from "../configs/dotenv.config.js";

const firebase = initializeApp(config.firebaseConfig);

export default firebase;
