import { MongoClient } from "mongodb";
import config from "../configs/dotenv.config.js";

const uri = config.documentDbUri;
const client = new MongoClient(uri, { useUnifiedTopology: true });

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("flightDB");
    console.log("Connected to Amazon DocumentDB");
    return db; // Trả về db sau khi kết nối
  } catch (error) {
    console.error("Error connecting to DocumentDB:", error);
    throw error;
  }
}

export { connectDB, db }; // Export cả connectDB và db
