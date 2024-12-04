import admin from "firebase-admin";

const serviceAccount = require("../../private/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: serviceAccount.project_id,
});

export default admin;
