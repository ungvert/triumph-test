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

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

type Props = {
  data: DataItem[];
  setData: Dispatch<
    SetStateAction<
      {
        name: string;
        type: string;
        color: string;
      }[]
    >
  >;
};

export default function SimpleTable({ data, setData }: Props) {
  const [open, setOpen] = React.useState(false);

  //So I always have an initial reference point, we'll just hang onto the order
  const [order, setOrder] = useState(
    new Array(data.length).fill(null).map((n, i) => i)
  );

  const onReorderEnd = useCallback(
    ({ oldIndex, newIndex, collection, isKeySorting }, e) => {
      const newOrder = [...order];
      const moved = newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, moved[0]);
      setOrder(newOrder);
    },
    [order, setOrder]
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const theme = useTheme();
  const classes = useStyles();

  const styles = {
    cellHeader: css`
      font-weight: 600;
      color: ${theme.palette.text.secondary};
    `,
    cellColorWrapper: css`
      display: flex;
      align-items: center;
      justify-content: flex-end;
    `,
    cellColorLegend: css`
      display: inline-block;
      flex-shrink: 0;
      width: ${theme.spacing(5)}px;
      height: ${theme.spacing(5)}px;
      margin-right: ${theme.spacing(1)}px;
      border: 1px solid ${theme.palette.grey[400]};
      border-radius: ${theme.spacing(1)}px;
    `,
  };

  const SortableRowContainer = SortableContainer(
    ({ children }: { children: JSX.Element[] }) => {
      return <TableBody>{children}</TableBody>;
    }
  );

  const SortableItem = SortableElement(({ value }: { value: JSX.Element }) => (
    <TableRow
      css={css`
        :hover {
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
        }
      `}
    >
      <TableCell component="th" scope="row">
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
      <TableContainer
        component={Paper}
        css={css`
          /* position: relative; */
        `}
      >
        <Table className={classes.table} aria-label="simple table">
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
            axis={'y'}
            onSortEnd={onSortEnd}
            useDragHandle
            helperClass="react-sortable-hoc"
          >
            {order.map((colIdx, i) => {
              const row = data[colIdx];
              return (
                <SortableItem
                  key={colIdx}
                  index={i}
                  value={
                    <React.Fragment>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">
                        <div css={styles.cellColorWrapper}>
                          <span
                            css={[
                              styles.cellColorLegend,
                              css`
                                background-color: ${row.color};
                              `,
                            ]}
                          ></span>
                          <span> {row.color}</span>
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
      <TableItemDialog open={open} setOpen={setOpen} />
    </React.Fragment>
  );
}
