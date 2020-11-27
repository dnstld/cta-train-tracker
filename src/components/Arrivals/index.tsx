import React, { useState, useEffect, useCallback } from 'react';

import moment from 'moment';

import api from '../../services/api';

interface eta {
  arrT: string;
  destNm: string;
  destSt: string;
  prdt: string;
  staId: string;
  staNm: string;
  stpDe: string;
  stpId: string;
  isApp: string;
  isDly: number;
  heading: string;
  rn: string;
}

interface Tracker {
  ctatt: {
    errCd: string;
    errNm: string;
    eta: eta[];
    tmst: string;
  };
}

interface DetailsProps {
  mapId: string;
  lineColor: string;
}

const Arrivals: React.FC<DetailsProps> = ({ mapId, lineColor }) => {
  const [tracker, setTracker] = useState<Tracker[]>([]);

  const fetchApi = useCallback(() => {
    const KEY = 'e22345c93ad34bad94edbc2a46fa90ad';

    api
      .get(`?key=${KEY}&max=1&mapid=${mapId}&outputType=JSON`)
      .then(response => {
        setTracker([response.data]);
      })
      .catch(error => {
        console.log(error);
      });
  }, [mapId]);

  useEffect(() => {
    fetchApi();

    setInterval(() => {
      fetchApi();
    }, 60000);
  }, [fetchApi]);

  function headingTo(deg: string): string {
    const n = +deg;
    let heading = '';

    if (n >= 270) {
      heading = 'West';
    } else if (n >= 180 && n < 270) {
      heading = 'South';
    } else if (n >= 90 && n < 180) {
      heading = 'East';
    } else {
      heading = 'North';
    }

    return heading;
  }

  function estimatedTime(
    prdt: string,
    arrT: string,
    isApp: string,
    isDly: number,
  ): string {
    const now = moment(prdt);
    const expiration = moment(arrT);
    const diff = expiration.diff(now);
    const diffDuration = moment.duration(diff);

    const isAppBoolean = !!Number(isApp);
    const isDlyBoolean = !!Number(isDly);

    let message = '';

    if (isAppBoolean) {
      message = 'Due';
    } else if (isDlyBoolean) {
      message = 'Delayed';
    } else {
      message = `${diffDuration.minutes()} min`;
    }

    return message;
  }

  return (
    <ul className="list-none">
      {tracker.map(item => (
        <li key={item.ctatt.tmst}>
          {item.ctatt.eta.map(ab => (
            <div key={ab.arrT} className="md:flex md:items-center">
              <div className="md:flex-1">
                <small className="italic">
                  Heading {headingTo(ab.heading)} ({lineColor} Line)
                </small>
                <p className="text-lg">
                  {ab.stpDe} (#{ab.rn})
                </p>
                <h1 className="font-extrabold text-4xl md:text-6xl my-4 md:mb-0">
                  {ab.destNm}
                </h1>
              </div>
              <div className="md:text-right">
                <span className="block font-extrabold text-6xl md:text8xl">
                  {estimatedTime(ab.prdt, ab.arrT, ab.isApp, ab.isDly)}
                </span>
                <small>(Updates every minute)</small>
              </div>
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
};

export default Arrivals;
