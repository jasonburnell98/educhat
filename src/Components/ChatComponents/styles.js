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
  avatar: {
    float: 'left',
  },
  deleteButton: {
    float: 'right',
  },
}));
