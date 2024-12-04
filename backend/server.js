import express from "express";
import cors from "cors";
import config from "./src/configs/dotenv.config.js";
import initWebRoute from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

initWebRoute(app);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`)
);
