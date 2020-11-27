import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import axios from 'axios';

import Arrivals from '../../components/Arrivals';

interface StopsLocation {
  ada: boolean;
  blue: boolean;
  brn: boolean;
  direction_id: string;
  g: boolean;
  location: {
    latidude: string;
    longitude: string;
  };
  map_id: string;
  o: boolean;
  p: boolean;
  pexp: boolean;
  pnk: boolean;
  red: boolean;
  station_description_name: string;
  station_name: string;
  stop_id: number;
  stop_name: string;
  y: boolean;
}

interface StationsParams {
  station: string;
}

interface StationName {
  station_name: string;
}

const Details: React.FC = () => {
  const { params } = useRouteMatch<StationsParams>();
  const [stationLocations, setStationLocations] = useState<
    Array<StopsLocation>
  >([]);

  useEffect(() => {
    axios
      .get('https://data.cityofchicago.org/resource/8pix-ypme.json')
      .then(response => {
        const { data } = response;

        const stationLStops = data.filter(
          (station: StationName) => station.station_name === params.station,
        );

        setStationLocations(stationLStops);
      })
      .catch(error => {
        console.log(error);
      });
  }, [params.station, setStationLocations]);

  return (
    <>
      <h1>Station: {params.station}</h1>

      {stationLocations &&
        stationLocations.map((location: StopsLocation) => (
          <div key={location.stop_id}>
            <div>
              <p>{location.station_name}</p>
              <p>{location.stop_name}</p>
            </div>

            <Arrivals mapId={location.map_id} />
          </div>
        ))}
    </>
  );
};

export default Details;
