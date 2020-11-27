import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  function headingTo(h: string): void {
    const headingMap: { [unit: string]: any } = {
      N: 'North',
      E: 'East',
      S: 'South',
      W: 'West',
    };

    return headingMap[h];
  }

  return (
    <>
      <header className="p-4">
        <h1 className="text-4xl antialiased font-black tracking-wide text-gray-800">
          Stations
        </h1>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8 p-4">
        {stations.map((station: CTAStations) => (
          <Link
            key={station.STATION_NAME}
            to={`/details/${station.STATION_NAME}`}
            className="transition shadow-sm hover:shadow-lg transform scale-100 hover:scale-105 focus:scale-105 bg-gray-50 hover:bg-white focus:outline-none focus:bg-white rounded-t-2xl select-none p-4"
          >
            <header className="text-xl font-bold text-gray-800 mb-4">
              <h2>{station.STATION_NAME}</h2>
            </header>

            <div className="grid gap-4">
              <h3 className="text-base font-normal text-gray-500">Stops:</h3>

              {station.STOPS.map((stop: CTAStationStops) => (
                <div key={stop.STOP_ID} className="p-2 bg-gray-100 rounded">
                  <small className="mb-4 text-gray-400">
                    Heading {headingTo(stop.DIRECTION)}
                  </small>
                  <hr />
                  <div className="flex flex-col mt-2">
                    <span className="font-bold text-gray-600">
                      {stop.STOP_NAME}
                    </span>
                    <span className="text-sm italic text-gray-400">
                      - {stop.STATION_DESCRIPTIVE_NAME}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Stations;
