import { Box, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStyle } from './main.style';
import { Map } from 'src/components/static/map';


const Main = () => {
  const classes = useStyle();
  const { t } = useTranslation();
  const [ lngLat, setLngLat ] = useState<number[]>();
  const [ lastMapId, setLastMapId ] = useState<string>();
  const [ lastPopupPos, setPopupPos ] = useState<any>();

  return (
    <Box className={classes.PageWrapper}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Map
            id={'mapa'}
            height={500}
            filePath={'./tiff/a.tif'}
            clickedCoordinates={ lastMapId !== 'mapa' ? { pos: lastPopupPos, coordinates: lngLat } : undefined }
            mapClickCallBack={(lng: number, lat: number, id: string, popupPos: any) => {
              setPopupPos(popupPos);
              setLastMapId(id);
              setLngLat([ lng, lat ]);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Map
            id={'mapb'}
            height={500}
            filePath={'./tiff/b.tif'}
            clickedCoordinates={ lastMapId !== 'mapb' ? { pos: lastPopupPos, coordinates: lngLat } : undefined }
            mapClickCallBack={(lng: number, lat: number, id: string, popupPos: any) => {
              setPopupPos(popupPos);
              setLastMapId(id);
              setLngLat([ lng, lat ]);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
