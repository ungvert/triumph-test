import React, { useState } from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ColorPicker from './ColorPicker';
import { RGBColor } from 'react-color';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dataItem: DataItem | null;
  setData: SetData;
};
export default function TableItemDialog({
  open,
  setOpen,
  dataItem,
  setData,
}: Props) {
  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  // const [color, setColor] = useState<RGBColor>({ r: 0, g: 0, b: 0, a: 1 });

  const handleClose = () => {
    setData()
    setOpen(false);
  };

  const color = dataItem ? dataItem.color : '#000000';

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Редактировать
      </DialogTitle>
      <DialogContent dividers>
        <Box>
          <TextField
            label="Name"
            variant="outlined"
            size="small"
            margin="dense"
            type="text"
            value={dataItem?.name}
          />

          <TextField
            label="Type"
            variant="outlined"
            size="small"
            margin="dense"
            type="text"
            value={dataItem?.type}
          />
        </Box>

        <ColorPicker initialColor={color} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}