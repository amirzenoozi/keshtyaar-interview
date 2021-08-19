import { createStyles, makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) =>
  createStyles({
    popper: {
      zIndex: theme.zIndex.modal,
    },
    paper: {
      border: `solid 1px ${theme.palette.grey[300]}`,
    },
    itemIcon: {
      minWidth: theme.spacing(3),
      direction: 'ltr',
    },
  })
);

export { useStyle };
