/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

function createData(name: string, type: string, color: string) {
  return { name, type, color };
}
// [{name:"name1", type="main", color=''#f4f4f4'},{name:"name2", type="side", color=''#f8f8f8'}]
const rows = [
  createData('name1', 'main', '#f4f4f4'),
  createData('name2', 'side', '#f8f8f8'),
];

export default function SimpleTable() {
  const theme = useTheme();

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Color</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell
                align="right"
                css={css`
                  display: flex;
                  align-items: center;
                `}
              >
                <span> {row.color}</span>
                <span
                  css={css`
                    display: inline-block;
                    flex-shrink: 0;
                    width: ${theme.spacing(5)}px;
                    height: ${theme.spacing(5)}px;
                    margin-right: ${theme.spacing(1)}px;

                    background-color: ${row.color};
                    border: 1px solid ${theme.palette.grey[500]};
                    border-radius: ${theme.spacing(1)}px;
                  `}
                ></span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
