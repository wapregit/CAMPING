import { MapContainer, TileLayer } from 'react-leaflet';

import { DEFAULT_LOCATION } from '@/utils/constants';

import Layer from './Layer';

const MapHome = () => {
  return (
    <div>
      <MapContainer className="z-0 h-[80vh] rounded-md" center={DEFAULT_LOCATION} zoom={9} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Layer />
      </MapContainer>
    </div>
  );
};
export default MapHome;
