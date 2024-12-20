import adminRoutes from "./users/admin.routes";
import customerRoutes from "./users/customer.routes";
import loginRoutes from "./login/index";
import flightRoutes from "./flights/flight.routes";
import bookingRoutes from "./bookings/booking.routes";
import ticketRoutes from "./bookings/ticket.routes";
import newsRoutes from "./news/news.routes";

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
