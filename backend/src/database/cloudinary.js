import config from "../configs/dotenv.config.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(config.cloudinaryConfig);

export default cloudinary;
