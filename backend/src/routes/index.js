import adminRoutes from "./users/Admin.routes.js";
import customerRoutes from "./users/Customer.routes.js";
import loginRoutes from "./login/index.js";
import flightRoutes from "./flights/flight.routes.js";
import bookingRoutes from "./bookings/booking.routes.js";
import ticketRoutes from "./bookings/ticket.routes.js";
import newsRoutes from "./news/news.routes.js";
//asdasdsad
const initWebRoutes = (app) => {
  app.use("/api/customer", customerRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/login", loginRoutes);
  app.use("/api/flight", flightRoutes);
  app.use("/api/booking", bookingRoutes);
  app.use("/api/ticket", ticketRoutes);
  app.use("/api/news", newsRoutes);
  app.use("/", (req, res) => res.send("Hello World!"));
  return app;
};

export default initWebRoutes;
