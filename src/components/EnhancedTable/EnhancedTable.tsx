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
    // minWidth: 320,
    // maxWidth: 320,
  },
});

type Props = {
  data: DataItem[];
  setData: SetData;
};

export default function SimpleTable({ data, setData }: Props) {
  const [open, setOpen] = React.useState(false);
  const [activeItem, setActiveItem] = useState<DataItem | null>(null);
  const [order, setOrder] = useState(
    new Array(data.length).fill(null).map((n, i) => i)
  );

  const handleClickOpen = (row: DataItem) => {
    setActiveItem(row);
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
      justify-content: center;
    `,
    cellColorLegend: css`
      display: inline-block;
      flex-shrink: 0;
      width: ${theme.spacing(5)}px;
      height: ${theme.spacing(5)}px;
      margin-right: ${theme.spacing(1)}px;
      /* border: 1px solid ${theme.palette.grey[400]}; */
      border-radius: ${theme.spacing(1)}px;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    `,
    cellColorText: css`
      flex-shrink: 0;
      flex-basis: 30%;
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
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell css={styles.cellHeader}></TableCell>
              <TableCell css={styles.cellHeader}>Name</TableCell>
              <TableCell align="right" css={styles.cellHeader}>
                Type
              </TableCell>
              <TableCell align="center" css={styles.cellHeader}>
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
              // const row = data[colIdx];
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
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="left">
                        <div css={styles.cellColorWrapper}>
                          <span
                            css={[
                              styles.cellColorLegend,
                              css`
                                background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHUlEQVQ4jWNgYGAQIYAJglEDhoUBg9+FowbQ2gAARjwKARjtnN8AAAAASUVORK5CYII=')
                                  repeat scroll left center;
                                position: relative;
                              `,
                            ]}
                          >
                            <span
                              css={[
                                styles.cellColorLegend,
                                css`
                                  background-color: ${row.color};
                                  opacity: 1;
                                  position: absolute;
                                  top: 0;
                                  left: 0;
                                `,
                              ]}
                            />
                          </span>

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
