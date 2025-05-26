import express from "express";
import cors from "cors";
import config from "./src/configs/dotenv.config.js";
import initWebRoute from "./src/routes/index.js";
import { connectDB } from "./src/database/mongo.js";

const app = express();

app.use(cors());
app.use(express.json());

initWebRoute(app);

async function startServer() {
    try {
    	await connectDB(); // Chờ kết nối cơ sở dữ liệu hoàn tất
    	app.listen(config.port,'0.0.0.0', () => {
      	console.log(`Server is live @ ${config.hostUrl}`)
    	});
    } catch (error) {
    	console.error("Failed to start server:", error);
    	process.exit(1); // Thoát ứng dụng nếu kết nối thất bại
    }    
}

startServer();
