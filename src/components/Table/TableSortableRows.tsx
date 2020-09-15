/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';

import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';

export const SortableRowContainer = SortableContainer(
  ({ children }: { children: JSX.Element[] }) => {
    return <TableBody>{children}</TableBody>;
  }
);

export const SortableItem = SortableElement(
  ({ value }: { value: JSX.Element }) => (
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
  )
);

export const DragHandle = SortableHandle(() => (
  <IconButton aria-label="drag">
    <DragIndicatorIcon />
  </IconButton>
));
