import { useEffect, useState } from 'react';

import L from 'leaflet';
import { FieldValues, Path, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

import { DEFAULT_LOCATION } from '@/utils/constants';

type MapProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  location: [number, number];
  resetTrigger?: number;
};

interface LocationMarkerProps {
  position: L.LatLng | null;
  setPosition: (position: L.LatLng) => void;
  setValue: UseFormSetValue<any>;
}

const LocationMarker = ({ position, setPosition, setValue }: LocationMarkerProps) => {
  const map = useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;

      setPosition(event.latlng);
      map.flyTo(event.latlng);

      if (setValue) {
        setValue('lat', lat);
        setValue('lng', lng);
        console.log(event.latlng);
      }
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};

const Map = <T extends FieldValues>({ location, register, setValue, resetTrigger }: MapProps<T>) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useEffect(() => {
    setPosition(null); // reset marker
    setValue('lat' as Path<T>, 0 as any);
    setValue('lng' as Path<T>, 0 as any);
  }, [resetTrigger, setValue]);

  return (
    <div className="mt-4">
      {register && (
        <>
          <input hidden {...register('lat' as Path<T>)} value={position ? position.lat : ''} />
          <input hidden {...register('lng' as Path<T>)} value={position ? position.lng : ''} />
        </>
      )}

      <h1 className="text-md mb-1 font-semibold">Location:</h1>

      <MapContainer
        className="z-0 h-[50vh] rounded-md"
        center={location || DEFAULT_LOCATION}
        zoom={9}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} setValue={setValue} />
      </MapContainer>
    </div>
  );
};

export default Map;
