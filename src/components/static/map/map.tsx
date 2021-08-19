import { Box } from '@material-ui/core';
import clsx from 'clsx';
import L from 'leaflet';
import 'leaflet.markercluster';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStyle } from './map.style';
import './map.style.scss';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import { MapProps } from 'src/components/static/map/map.props';

const parseGeoraster = require('georaster');
const geoblaze = require('geoblaze');

const Map: React.FC<MapProps> = ({
  height,
  filePath,
  id,
  mapClickCallBack,
  clickedCoordinates,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const [ geo, setGeo ] = useState<any>();
  const [ map, setMap ] = useState<L.Map>();

  const numberToColorHsl = (value: number, min: number, max: number) => {
    const normalizedValue = (value - min) / (max - min);
    const hue = ((normalizedValue) * 100).toString(10);
    return `hsl(${hue}, 100%, 50%)`;
  };

  useEffect(() => {
    setMap( L.map(id).setView([ 0, 0 ], 8) );
  }, []);

  useEffect(() => {
    if ( !map ) return;
    const popup = L.popup();

    // add OpenStreetMap basemap
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    fetch(filePath).then((response) => response.arrayBuffer()).then((arrayBuffer) => {
      parseGeoraster(arrayBuffer).then((geo: any) => {
        setGeo( geo );
        const layer = new GeoRasterLayer({
          georaster: geo,
          opacity: 0.8,
          resolution: 512,
          pixelValuesToColorFn: (values) => values[0] ? numberToColorHsl( values[0], geo['mins'][0], geo['maxs'][0] ) : null,
        });
        layer.addTo(map);

        map.fitBounds(layer.getBounds());

        map.on('click', (evt: any) => {
          const latlng = map.mouseEventToLatLng(evt['originalEvent']);
          mapClickCallBack(latlng.lng, latlng.lat, id, evt.latlng);
          if ( !isNaN( geoblaze.identify(geo, [ latlng.lng, latlng.lat ])) ) {
            popup.setLatLng(evt.latlng).setContent('Value: ' + geoblaze.identify(geo, [ latlng.lng, latlng.lat ])?.toString()).openOn(map);
          }
        });
      });
    });

    // loading the map in proper way
    setTimeout(() => {
      map.invalidateSize(true);
    }, 100);
  }, [map]);

  // Handle Sync Clicked
  useEffect(() => {
    const popup = L.popup();
    if ( !clickedCoordinates ) return;
    if ( !clickedCoordinates['pos'] || !clickedCoordinates['coordinates'] ) return;
    popup.setLatLng(clickedCoordinates['pos'])
        .setContent('Value: ' + geoblaze.identify(geo, clickedCoordinates['coordinates'])?.toString())
        .openOn(map);
  }, [clickedCoordinates]);

  return (
    <div className={clsx(classes.min_content, 'map-wrapper')}>
      <Box id={id} className={classes.mapContainer} style={{ height }} />
      <div className="map-overlay" />
    </div>
  );
};

export { Map };
