import { makeStyles, createStyles } from '@material-ui/core';

export const useStyle = makeStyles(() =>
  createStyles({
    mapContainer: {
      maxWidth: '100%',
      overflow: 'hidden',
    },
    branches: {
      'position': 'absolute',
      'top': '10px',
      'bottom': '10px',
      'right': '10px',
      'backgroundColor': 'rgba(256, 256, 256, 1)',
      'color': '#000',
      'width': '355px',
      'borderRadius': '10px',
      'padding': '0.625rem',
      'zIndex': 800,
      'boxShadow': '0 0 10px rgba(0, 0, 0, 0.16)',
      'transform': 'translateY(0)',
      'transition': '0.5s ease',
      '@media (max-width: 40em)': {
        width: '100%',
        zIndex: 1000,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 0,
      },

      '& .name': {
        cursor: 'poiner',
      },
    },
    hideBranchesList: {
      'transform': 'translateX(105%)',
      '@media(max-width:40em)': {
        transform: 'translateX(100%)',
      },
    },
    branchesInnerBox: {
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      bottom: 0,
    },
    mapInput: {
      'width': '100%',
      'marginBottom': '4px',
      'color': '#CECFD0',
      '@media (max-width: 40em)': {
        marginTop: '8px',
      },
    },
    searchList: {
      position: 'absolute',
      height: '88%',
      width: '95%',
    },
    arrow: {
      'position': 'absolute',
      'bottom': 50,
      'left': -40,
      'background': '#fff',
      'zIndex': 1000,
      'cursor': 'pointer',
      'padding': '5px 10px 5px 8px',
      'display': 'flex',
      'justifyContent': 'center',
      'alignItems': 'center',
      'borderRadius': '12px 0 0 12px',
      'transition': '0.5s ease',
      'boxShadow': '0 0 10px rgba(0,0,0,0.16)',
      '& svg': {
        transition: '0.5s ease',
      },
    },
    moveArrow: {
      'padding': '5px 18px 5px 0px',
      'boxShadow': '0 0 0 rgba(0,0,0,0)',

      ' & svg': {
        transform: 'rotate(180deg)',
      },
    },
    closeBtn: {
      'display': 'none',
      '@media (max-width: 40em)': {
        display: 'block',
      },
    },
    min_content: {
      flex: 1,
      width: '100%',
      position: 'relative',
    },
  })
);
