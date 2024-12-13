import adminRoutes from "./users/admin.routes";
import customerRoutes from "./users/customer.routes";
import loginRoutes from "./login/index";
//import flightRoutes from "./flights/flight.routes";
import bookingRoutes from "./bookings/booking.routes";

const initWebRoutes = (app) => {
  app.use("/api/customer", customerRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/login", loginRoutes);
//  app.use("/api/flight", flightRoutes);
  app.use("/api/booking", bookingRoutes);
  return app;
};

export default initWebRoutes;
