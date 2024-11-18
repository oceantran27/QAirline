import express from "express";
import cors from "cors";

import config from "./src/configs/dotenv.config.js";
import adminRoutes from "./src/routes/users/Admin.routes";
import customerRoutes from "./src/routes/users/Customer.routes";

const app = express();

app.use(cors());
app.use(express.json());

// console.log(">>>", customerRoutes);

app.use("/api/user/customer", customerRoutes);
app.use("/api/user/admin", adminRoutes);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`)
);
