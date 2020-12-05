import React from 'react';
import { useScrollTrigger } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';

// import { useStyles } from 'components/shared/ScrollTop/styles';
import Fab from '@material-ui/core/Fab';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));
export const ScrollTop = () => {
  const classes = useStyles();
  const isScrolledDown = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Zoom in={isScrolledDown}>
      <Fab
        className={classes.fab}
        color={'primary'}
        size={'small'}
        onClick={() =>
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      >
        <UpIcon />
      </Fab>
    </Zoom>
  );
};
