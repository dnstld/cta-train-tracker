import React, { useState, useEffect } from 'react';

import axios from 'axios';

interface CTAStationStops {
  STOP_ID: number;
  DIRECTION: string;
  STOP_NAME: string;
  STATION_DESCRIPTIVE_NAME: string;
  MAP_ID: number;
  ADA: boolean;
  RED: boolean;
  BLUE: boolean;
  GREEN: boolean;
  BROWN: boolean;
  PURPLE: boolean;
  PURPLE_EXPRESS: boolean;
  YELLOW: boolean;
  PINK: boolean;
  ORANGE: boolean;
  LOCATION: string;
}

interface CTAStations {
  STATION_NAME: string;
  STOPS: CTAStationStops[];
}

const Stations: React.FC = () => {
  const [stations, setStations] = useState<CTAStations[]>([]);

  useEffect(() => {
    axios
      .get(
        'https://raw.githubusercontent.com/thomasjfox1/cta-stations/master/cta_stations.json',
      )
      .then(response => {
        setStations(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [setStations]);

  return (
    <>
      {stations.map((station: CTAStations) => (
        <li key={station.STATION_NAME}>
          {station.STATION_NAME}
          {station.STOPS.map((stop: CTAStationStops) => (
            <div key={stop.STOP_ID}>
              <p>{stop.STOP_ID}</p>
              <p>{stop.DIRECTION}</p>
              <p>{stop.STOP_NAME}</p>
              <p>{stop.STATION_DESCRIPTIVE_NAME}</p>
              <p>{stop.MAP_ID}</p>
              <p>{stop.LOCATION}</p>
            </div>
          ))}
        </li>
      ))}
    </>
  );
};

export default Stations;
