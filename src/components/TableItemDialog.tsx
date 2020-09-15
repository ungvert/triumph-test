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
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { v4 as uuidv4 } from 'uuid';

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
  data: DataItem[];
  dataItem: DataItem;
  setData: SetData;
  setActiveItem: React.Dispatch<React.SetStateAction<DataItem | null>>;
};
export default function TableItemDialog({
  open,
  setOpen,
  data,
  dataItem,
  setData,
  setActiveItem,
}: Props) {
  const isNewItem = !dataItem.id;

  const [name, setName] = useState(dataItem.name);
  const [type, setType] = useState(dataItem.type);
  const [color, setColor] = useState<string>(dataItem.color);

  const id = isNewItem ? uuidv4() : dataItem.id;

  const handleSubmit = () => {
    const changedItem = { name, type, color, id };
    if (isNewItem) {
      setData([...data, changedItem]);
    } else {
      setData(data.map((item) => (item.id === id ? changedItem : item)));
    }

    setActiveItem(null);
    setOpen(false);
  };

  const handleClose = () => {
    setActiveItem(null);
    setOpen(false);
  };

  const handleDelete = () => {
    setData(data.filter((item) => item.id !== id));

    setActiveItem(null);
    setOpen(false);
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setName(e.target.value);

  const handleTypeChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setType(e.target.value);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {isNewItem ? 'Добавить' : 'Редактировать'}
      </DialogTitle>
      <DialogContent dividers>
        <Box>
          <TextField
            label="Name"
            variant="outlined"
            size="small"
            margin="dense"
            type="text"
            value={name}
            onChange={handleNameChange}
          />

          <TextField
            label="Type"
            variant="outlined"
            size="small"
            margin="dense"
            type="text"
            value={type}
            onChange={handleTypeChange}
          />
        </Box>

        <ColorPicker color={color} setColor={setColor} />
      </DialogContent>
      <DialogActions>
        {!isNewItem && (
          <Button onClick={handleDelete} color="secondary">
            Удалить
          </Button>
        )}

        <Button onClick={handleSubmit} color="primary">
          {isNewItem ? 'Создать' : 'Сохранить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
