import {
  dbGetAllFlights,
  dbGetFlightById,
  dbCreateFlight,
  dbUpdateFlight,
  dbDeleteFlight,
  dbCreateFlights,
} from "../../services/flights/flight.service";
import Flight from "../../models/flights/flight.model";
import { generateMockFlights } from "../../services/flights/flightGenerate.service";

export const getAllFlights = async (req, res) => {
  try {
    const flights = await dbGetAllFlights();
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

export const getFlightById = async (req, res) => {
  try {
    const flightId = req.params.flightId;
    const flightData = await dbGetFlightById(flightId);
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
    const flightId = req.params.flightId;
    const updateData = req.body;

    await dbUpdateFlight(flightId, updateData);
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
    const flightId = req.params.flightId;

    await dbDeleteFlight(flightId);
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
    const flights = generateMockFlights(departureCity, arrivalCity, flightDate);
    await dbCreateFlights(flights);
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
