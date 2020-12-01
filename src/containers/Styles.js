import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const StyledCard = withStyles(() => ({
  root: {
    minWidth: 275,
    display: 'inline-block',
    margin: '0 1px',
    transform: 'scale(0.9)',
    fontSize: 14,
    marginBottom: 12,
  },
}))(Card);

export const StyledAlert = withStyles((theme) => ({
  root: {
      width: '30%',
      '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))(Alert);

export const StyledTextField = withStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))(TextField);

export const StyledButton = withStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))(Button);
