import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  noteWrap: {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius * 3,
    whiteSpace: 'normal',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
  },

  paper: {
    marginRight: theme.spacing(2),
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  mainIcons: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navStyle: {
    color: 'black',
    padding: theme.spacing(0, 2),
  },

  /////*********** */
  navHolder: {
    display: 'flex',
    width: '100%',
  },
  leftContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'quicksand',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textTransform: 'lowercase',
    color: theme.palette.primary.main,
    marginTop: -5,
    flexGrow: 1,
  },
  titleIcon: {
    marginRight: theme.spacing(0.5),
  },
}));
