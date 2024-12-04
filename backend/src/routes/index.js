import adminRoutes from "./users/admin.routes";
import customerRoutes from "./users/customer.routes";
import { handleLogin } from "../controllers/login";

// Đảm bảo khai báo hàm đúng cách
const initWebRoutes = (app) => {
  app.use("/api/customer", customerRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/login", handleLogin);
  return app;
};

export default initWebRoutes;
