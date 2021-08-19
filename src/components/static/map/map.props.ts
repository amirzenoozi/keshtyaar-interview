export interface MapProps {
  height: number,
  filePath: string,
  id: string,
  mapClickCallBack: any,
  clickedCoordinates?: {
    pos: any,
    coordinates: number[],
  },
}
