import React, { useState, useEffect } from 'react';

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
}

const Arrivals: React.FC<DetailsProps> = ({ mapId }) => {
  const KEY = 'e22345c93ad34bad94edbc2a46fa90ad';

  const [tracker, setTracker] = useState<Tracker[]>([]);

  useEffect(() => {
    api
      .get(`?key=${KEY}&max=1&mapid=${mapId}&outputType=JSON`)
      .then(response => {
        setTracker([response.data]);
      })
      .catch(error => {
        console.log(error);
      });
  }, [setTracker, mapId]);

  return (
    <>
      {tracker.map(item => (
        <li key={item.ctatt.tmst}>
          {item.ctatt.eta.map(ab => (
            <div key={ab.arrT}>
              <p>{ab.destNm}</p>
              <p>{ab.destSt}</p>
              <p>{ab.prdt}</p>
              <p>{ab.staId}</p>
              <p>{ab.staNm}</p>
              <p>{ab.stpDe}</p>
              <p>{ab.stpId}</p>
            </div>
          ))}
        </li>
      ))}
    </>
  );
};

export default Arrivals;
