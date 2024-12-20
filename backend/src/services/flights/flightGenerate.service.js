import Flight from "../../models/flights/flight.model.js";

const airports = {
  HAN: "Noi Bai International Airport",
  SGN: "Tan Son Nhat International Airport",
  DAD: "Da Nang International Airport",
  CXR: "Cam Ranh International Airport",
  PQC: "Phu Quoc International Airport",
  HPH: "Cat Bi International Airport",
  VCA: "Can Tho International Airport",
  HUI: "Phu Bai International Airport",
  VII: "Vinh International Airport",
  THD: "Tho Xuan Airport",
};

const aircraftTypes = [
  "Airbus A320",
  "Airbus A321",
  "Boeing 737",
  "Boeing 787",
  "Embraer E190",
  "ATR 72",
];

const priceRange = { min: 800000, max: 2200000 };

const getRandomInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const flightDurations = [60, 75, 90, 105, 120, 135, 150];

const generateRandomTimeInDayAfterNow = () => {
  const now = new Date();

  const randomOffsetInMinutes = getRandomInRange(0, 24 * 60);
  const randomTime = new Date(
    now.getTime() + randomOffsetInMinutes * 60 * 1000
  );

  const roundedMinutes = [0, 15, 30, 45].reduce((prev, curr) =>
    Math.abs(curr - randomTime.getMinutes()) <
    Math.abs(prev - randomTime.getMinutes())
      ? curr
      : prev
  );
  randomTime.setMinutes(roundedMinutes, 0, 0);

  return randomTime;
};

const generateMockFlight = (departureCity, arrivalCity) => {
  const departureAirport = airports[departureCity];
  const arrivalAirport = airports[arrivalCity];

  if (!departureAirport || !arrivalAirport) {
    throw new Error("Invalid departure or arrival city.");
  }

  const flightNumber = `VN${getRandomInRange(100, 999)}`;

  const aircraftType =
    aircraftTypes[getRandomInRange(0, aircraftTypes.length - 1)];

  const departureTime = generateRandomTimeInDayAfterNow();

  const flightDurationInMinutes =
    flightDurations[getRandomInRange(0, flightDurations.length - 1)];
  const arrivalTime = new Date(
    departureTime.getTime() + flightDurationInMinutes * 60 * 1000
  );

  const flightDurationInHours = flightDurationInMinutes / 60;

  const basePrice =
    Math.floor(getRandomInRange(priceRange.min, priceRange.max) / 100000) *
    100000;

  const status = Math.random() > 0.9 ? "Delayed" : "OnTime";

  const flightId = `${departureCity}${flightNumber.slice(-2)}-${departureTime
    .toISOString()
    .slice(2, 10)
    .replace(/-/g, "")}`;

  const flight = new Flight({
    flightId,
    flightNumber,
    aircraftType,
    departureAirport,
    arrivalAirport,
    departureCity,
    arrivalCity,
    departureTime,
    arrivalTime,
    basePrice,
    status,
  });

  return flight;
};

const generateMockFlights = (departureCity, arrivalCity) => {
  const numFlights = getRandomInRange(1, 5);
  const flights = [];
  for (let i = 0; i < numFlights; i++) {
    flights.push(generateMockFlight(departureCity, arrivalCity));
  }
  return flights;
};

const generateFlightSuggestions = () => {
  const airportCodes = Object.keys(airports);
  const suggestions = [];

  const numSuggestions = getRandomInRange(5, 15);
  for (let i = 0; i < numSuggestions; i++) {
    const departureCity =
      airportCodes[getRandomInRange(0, airportCodes.length - 1)];
    let arrivalCity;
    do {
      arrivalCity = airportCodes[getRandomInRange(0, airportCodes.length - 1)];
    } while (arrivalCity === departureCity);

    const flights = generateMockFlights(departureCity, arrivalCity);
    suggestions.push(...flights);
  }

  return suggestions;
};

export { generateMockFlight, generateMockFlights, generateFlightSuggestions };
