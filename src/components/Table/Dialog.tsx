import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ColorPicker from './ColorPicker';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { v4 as uuidv4 } from 'uuid';
import { DialogActions, DialogContent, DialogTitle } from './DialogElements';

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
