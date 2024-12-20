import { dbGetAllTickets } from "../services/bookings/ticket.service.js";
import { dbGetAllFlights } from "../services/flights/flight.service.js";
import {
  flightCache,
  ticketCache,
  setCache,
  getCache,
  deleteCache,
} from "../cache/cacheManager.js";

export const getStatistic = async (req, res) => {
  try {
    const cachedFlights = getCache(flightCache, "flights");
    const cachedTickets = getCache(ticketCache, "tickets");
    if (cachedFlights && cachedTickets) {
      let revenue = 0;
      for (let ticket of cachedTickets) {
        revenue += ticket.price;
      }
      return res.status(200).send({
        message: "Statistic fetched successfully",
        data: {
          flights: cachedFlights.length,
          tickets: cachedTickets.length,
          revenue: revenue,
        },
      });
    } else if (cachedFlights) {
      let revenue = 0;
      const tickets = await dbGetAllTickets();
      for (let ticket of tickets) {
        revenue += ticket.price;
      }
      setCache(ticketCache, "tickets", tickets);
      return res.status(200).send({
        message: "Statistic fetched successfully",
        data: {
          flights: cachedFlights.length,
          tickets: tickets.length,
          revenue: revenue,
        },
      });
    } else if (cachedTickets) {
      const flights = await dbGetAllFlights();
      let revenue = 0;
      for (let ticket of cachedTickets) {
        revenue += ticket.price;
      }
      setCache(flightCache, "flights", flights);
      return res.status(200).send({
        message: "Statistic fetched successfully",
        data: {
          flights: flights.length,
          tickets: cachedTickets.length,
          revenue: revenue,
        },
      });
    } else {
      const getAllFlightsPromise = dbGetAllFlights();
      const getAllTicketsPromise = dbGetAllTickets();

      const [flights, tickets] = await Promise.all([
        getAllFlightsPromise,
        getAllTicketsPromise,
      ]);
      setCache(flightCache, "flights", flights);
      setCache(ticketCache, "tickets", tickets);
      let revenue = 0;
      for (let ticket of tickets) {
        revenue += ticket.price;
      }
      res.status(200).send({
        message: "Statistic fetched successfully",
        data: {
          flights: flights.length,
          tickets: tickets.length,
          revenue: revenue,
        },
      });
    }
  } catch (error) {
    res.status(400).send({
      message: `Error getting statistic: ${error.message}`,
    });
  }
};
