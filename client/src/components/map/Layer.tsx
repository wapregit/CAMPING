import { useEffect, useState } from 'react';

import { LayerGroup, LayersControl, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';

import { listCamping } from '@/api/camping';

const Layer = () => {
  interface Landmark {
    id: string;
    title: string;
    description: string;
    lat: number;
    lng: number;
  }
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);

  useEffect(() => {
    hdlGetLandmark();
  }, []);

  const hdlGetLandmark = async () => {
    try {
      const res = await listCamping();

      setLandmarks(res?.data.result);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <LayersControl position="topright">
      <LayersControl.BaseLayer name="OSM" checked={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Satellite">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}.jpg"
        />
      </LayersControl.BaseLayer>

      <LayersControl.Overlay name="Landmarks" checked={true}>
        <LayerGroup>
          {landmarks.map((item) => {
            return (
              <Marker key={item.id} position={[item.lat, item.lng]}>
                <Popup>
                  <center>
                    {item.title} <br /> {item.description}
                  </center>
                </Popup>
                <Tooltip>{item.title}</Tooltip>
              </Marker>
            );
          })}
        </LayerGroup>
      </LayersControl.Overlay>
    </LayersControl>
  );
};
export default Layer;
