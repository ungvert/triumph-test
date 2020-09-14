// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Typography } from '@material-ui/core';

const style = css`
  color: hotpink;
`;

const Main = () => (
  <div
    css={css`
      color: hotpink;
    `}
  >
    <Typography> Some hotpink text.</Typography>
  </div>
);

export default Main;
