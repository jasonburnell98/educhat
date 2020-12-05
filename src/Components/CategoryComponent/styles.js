import { makeStyles, fade } from '@material-ui/core';
export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  editDeleteWrap: {
    float: 'left',
  },
  currUserWrap: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(4),

    borderRadius: theme.shape.borderRadius * 8,
    whiteSpace: 'normal',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.success.light
        : theme.palette.success.dark,
    // backgroundColor: '#3f5165',
  },
  border: {
    border: 'double',
  },
  nonCurrUserWrap: {
    paddingRight: theme.spacing(4),

    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius * 8,
    whiteSpace: 'normal',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
  },
  currUser: {
    paddingLeft: theme.spacing(12),
  },
  otherUser: {
    paddingRight: theme.spacing(12),
  },
  noteBody: {
    // padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    borderRadius: theme.shape.borderRadius * 2,
    whiteSpace: 'normal',
    // Easier way than worrying about light or dark mode, just add an
    // opacity to a middleground color
    // This also ensures that the blue-grey background adds some blue
    // to the note color on dark mode
    backgroundColor: fade(theme.palette.grey[500], 0.25),
  },
  input: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    float: 'left',
    textAlign: 'center',
  },
  avatarCurr: {
    float: 'right',
  },
  deleteButton: {
    float: 'right',
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  notesContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
    overflowY: 'auto',
    maxHeight: '73vh',
    '&::-webkit-scrollbar': {
      //change the width to width: '0.4em' to have a scroll bar viewable
      // width: "0px",
      width: '0.6em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: fade(theme.palette.grey[500], 0.25),
      borderRadius: 999,
      // outline: '1px solid slategrey'
    },
  },
  noteInput: {
    borderRadius: theme.shape.borderRadius * 3,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  major: {
    padding: theme.spacing(2),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));
