/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useCallback, useState, SetStateAction, Dispatch } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableItemDialog from '../TableItemDialog';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import IconButton from '@material-ui/core/IconButton';
import { Divider, Toolbar, Tooltip, Typography } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  data: DataItem[];
  setData: SetData;
};

export default function SimpleTable({ data, setData }: Props) {
  const [open, setOpen] = React.useState(false);
  const [activeItem, setActiveItem] = useState<DataItem | null>(null);

  const handleClickOpen = (row: DataItem) => {
    setActiveItem(row);
    setOpen(true);
  };

  const handleAddClick = () => {
    setActiveItem({ name: '', type: '', color: '#000000', id: '' });
    setOpen(true);
  };

  const theme = useTheme();

  const styles = {
    cellHeader: css`
      font-weight: 600;
      color: ${theme.palette.text.secondary};

      /* padding: 0; */
      padding: ${theme.spacing(2)}px ${theme.spacing(1)}px;
    `,
    cellContent: css`
      padding: 0 ${theme.spacing(1)}px;
    `,
    cellColorWrapper: css`
      display: flex;
      align-items: center;
      justify-content: flex-end;
    `,
    cellColorLegend: css`
      display: inline-block;
      flex-shrink: 0;
      width: ${theme.spacing(4)}px;
      height: ${theme.spacing(4)}px;
      border-radius: ${theme.spacing(1)}px;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
      margin: 0 ${theme.spacing(1)}px;
      margin-left: ${theme.spacing(3)}px;
    `,
    cellColorText: css`
      flex-shrink: 0;

      min-width: 60px;
    `,
  };

  const SortableRowContainer = SortableContainer(
    ({ children }: { children: JSX.Element[] }) => {
      return <TableBody>{children}</TableBody>;
    }
  );

  const SortableItem = SortableElement(({ value }: { value: JSX.Element }) => (
    <TableRow
      hover
      css={css`
        :hover {
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
        }
      `}
    >
      <TableCell
        component="th"
        scope="row"
        css={css`
          padding: 0;
        `}
      >
        <DragHandle />
      </TableCell>
      {value}
    </TableRow>
  ));

  const DragHandle = SortableHandle(() => (
    <IconButton aria-label="drag">
      <DragIndicatorIcon />
    </IconButton>
  ));

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setData(arrayMove(data, oldIndex, newIndex));
  };
  return (
    <React.Fragment>
      <Paper>
        <Toolbar disableGutters>
          <IconButton aria-label="filter list" onClick={handleAddClick}>
            <AddBoxIcon fontSize="large" />
          </IconButton>

          <Typography variant="body1" component="div" color="textSecondary">
            Добавить запись
          </Typography>
        </Toolbar>
        <Divider />
        <TableContainer
          css={css`
            overflow-x: ${activeItem ? 'hidden' : 'auto'};
          `}
        >
          <Table aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell css={styles.cellHeader}></TableCell>
                <TableCell css={styles.cellHeader}>Name</TableCell>
                <TableCell align="right" css={styles.cellHeader}>
                  Type
                </TableCell>
                <TableCell align="right" css={styles.cellHeader}>
                  Color
                </TableCell>
              </TableRow>
            </TableHead>
            <SortableRowContainer
              onSortEnd={onSortEnd}
              useDragHandle
              helperClass="react-sortable-hoc"
            >
              {data.map((row, i) => {
                return (
                  <SortableItem
                    key={row.id}
                    index={i}
                    value={
                      <React.Fragment>
                        <TableCell
                          component="th"
                          scope="row"
                          onClick={() => handleClickOpen(row)}
                          css={styles.cellContent}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          align="right"
                          css={styles.cellContent}
                          onClick={() => handleClickOpen(row)}
                        >
                          {row.type}
                        </TableCell>
                        <TableCell
                          align="left"
                          css={styles.cellContent}
                          onClick={() => handleClickOpen(row)}
                        >
                          <div css={styles.cellColorWrapper}>
                            <span
                              css={[
                                styles.cellColorLegend,
                                css`
                                  background-color: ${row.color};
                                `,
                              ]}
                            />
                            <span css={styles.cellColorText}> {row.color}</span>
                          </div>
                        </TableCell>
                      </React.Fragment>
                    }
                  ></SortableItem>
                );
              })}
            </SortableRowContainer>
          </Table>
        </TableContainer>
      </Paper>

      {activeItem && (
        <TableItemDialog
          open={open}
          setOpen={setOpen}
          data={data}
          dataItem={activeItem}
          setData={setData}
          setActiveItem={setActiveItem}
        />
      )}
    </React.Fragment>
  );
}
