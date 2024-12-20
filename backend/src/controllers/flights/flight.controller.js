import {
  dbGetAllFlights,
  dbGetFlightById,
  dbCreateFlight,
  dbUpdateFlight,
  dbDeleteFlight,
  dbCreateFlights,
  dbUpdateFlights,
} from "../../services/flights/flight.service.js";
import Flight from "../../models/flights/flight.model.js";
import {
  generateFlightSuggestions,
  generateMockFlights,
} from "../../services/flights/flightGenerate.service.js";
import {
  flightSuggestionsCache,
  flightCache,
  getCache,
  setCache,
  deleteCache,
} from "../../cache/cacheManager.js";

export const getAllFlights = async (req, res) => {
  try {
    const cachedFlights = getCache(flightCache, "flights");

    if (cachedFlights) {
      return res.status(200).send({
        message: "Flights fetched successfully ",
        data: cachedFlights,
      });
    }

    const flights = await dbGetAllFlights();
    const currentTime = new Date();

    const flightsToUpdate = flights.filter((flight) => {
      return (
        new Date(flight.arrivalTime.seconds * 1000) < currentTime &&
        flight.status !== "Landed"
      );
    });

    const updatedFlights = flightsToUpdate.map((flight) => ({
      ...flight,
      status: "Landed",
    }));

    if (updatedFlights.length > 0) {
      await dbUpdateFlights(updatedFlights);
    }

    setCache(flightCache, "flights", flights);

    res.status(200).send({
      message: "Flights fetched and updated successfully",
      data: flights,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getFlightById = async (req, res) => {
  try {
    const flightId = req.query.id;
    const cachedFlight = getCache(flightCache, flightId);

    if (cachedFlight) {
      return res.status(200).send({
        message: "Flight fetched successfully ",
        data: cachedFlight,
      });
    }

    const flightData = await dbGetFlightById(flightId);

    if (!flightData) {
      return res.status(404).send({
        message: "Flight not found",
      });
    }

    const arrivalTime = flightData.arrivalTime.toDate
      ? flightData.arrivalTime.toDate()
      : new Date(flightData.arrivalTime.seconds * 1000);

    const currentTime = new Date();

    if (arrivalTime < currentTime && flightData.status !== "Landed") {
      flightData.status = "Landed";
      await dbUpdateFlight(flightId, { status: "Landed" });
    }

    setCache(flightCache, flightId, flightData);

    res.status(200).send({
      message: "Flight fetched successfully",
      data: flightData,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const createFlight = async (req, res) => {
  try {
    const flightData = req.body;
    const flight = new Flight(flightData);

    await dbCreateFlight(flight);

    const cachedFlights = getCache(flightCache, "flights");
    if (cachedFlights) {
      cachedFlights.push(flight);
      setCache(flightCache, "flights", cachedFlights);
    }

    res.status(201).send({
      message: "Flight created successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const updateFlight = async (req, res) => {
  try {
    const flightId = req.query.id;
    const updateData = req.body;
    await dbUpdateFlight(flightId, updateData);
    const cachedFlight = getCache(flightCache, flightId);

    if (cachedFlight) {
      deleteCache(flightCache, flightId);
    }
    res.status(200).send({
      message: "Flight updated successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const deleteFlight = async (req, res) => {
  try {
    const flightId = req.query.id;
    await dbDeleteFlight(flightId);
    const cachedFlight = getCache(flightCache, flightId);

    if (cachedFlight) {
      deleteCache(flightCache, flightId);
    }
    res.status(200).send({
      message: "Flight deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const searchFlight = async (req, res) => {
  try {
    const { departureCity, arrivalCity, flightDate } = req.query;

    const cachedFlights = getCache(
      flightSuggestionsCache,
      `${departureCity}-${arrivalCity}-${flightDate}`
    );
    if (cachedFlights) {
      const currentTime = new Date();
      const validFlights = cachedFlights.filter((flight) => {
        return new Date(flight.departureTime) > currentTime;
      });

      setCache(
        flightSuggestionsCache,
        `${departureCity}-${arrivalCity}-${flightDate}`,
        validFlights
      );
      return res.status(200).send({
        message: "Flights fetched successfully ",
        data: validFlights,
      });
    }

    const flights = generateMockFlights(departureCity, arrivalCity, flightDate);
    await dbCreateFlights(flights);

    setCache(
      flightSuggestionsCache,
      `${departureCity}-${arrivalCity}-${flightDate}`,
      flights
    );
    res.status(200).send({
      message: "Flights fetched successfully",
      data: flights,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getFlightSuggestions = async (req, res) => {
  try {
    const cachedFlights = getCache(flightSuggestionsCache, "flights");
    const today = new Date().toISOString().slice(0, 10);

    if (cachedFlights) {
      const currentTime = new Date();
      const validFlights = cachedFlights.filter((flight) => {
        return new Date(flight.departureTime) > currentTime;
      });

      setCache(flightSuggestionsCache, "flights", validFlights);

      return res.status(200).send({
        message: "Flights fetched successfully ",
        data: validFlights,
      });
    }

    const flights = generateFlightSuggestions(today);
    await dbCreateFlights(flights);

    setCache(flightSuggestionsCache, "flights", flights);

    res.status(200).send({
      message: "Flights fetched successfully",
      data: flights,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
