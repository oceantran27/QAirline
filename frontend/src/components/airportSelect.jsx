import React, { useState } from "react";
import airportsData from "../data/airports_data.json";

export default function AirportSelect({ label, placeholder }) {
  const [selectedAirport, setSelectedAirport] = useState("");

  const handleSelectChange = (event) => {
    setSelectedAirport(event.target.value);
  };

  return (
    <select
      className="text-sm font-bold w-full"
      value={selectedAirport}
      onChange={handleSelectChange}
    >
      {/* Hiển thị placeholder nếu có */}
      <option value="" disabled>
        {placeholder || "Chọn điểm"}
      </option>
      {airportsData.map((region) => (
        <optgroup key={region.region} label={region.region}>
          {region.airports.map((airport) => (
            <option key={airport.code} value={airport.code}>
              {airport.city} ({airport.code})
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
