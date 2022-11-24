import '../styles/global.css';
import { useMemo, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import PlacesAutoComplete from './PlacesAutoComplete';


const MapScreen = () => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  const [selected, setSelected] = useState(null);

  const center = useMemo(() => ({ lat: 37.7749, lng: -122.4194 }), []);

  if(!isLoaded){
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="places-container">
        <PlacesAutoComplete setSelected={setSelected} />
      </div>

      <GoogleMap
        zoom={11}
        center={center}
        mapContainerClassName="map-container"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

export default MapScreen;