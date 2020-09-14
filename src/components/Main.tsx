/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Box, Container, Typography } from '@material-ui/core';
import EnhancedTable from './EnhancedTable/EnhancedTable';

const Main = () => (
  <div
    css={css`
      /* color: hotpink; */
    `}
  >
    <Container>
      <Box my={3}>
        <Typography variant="h3" align="center">
          Простой редактор табличных данных
        </Typography>
      </Box>
    </Container>
    <Container
      css={css`
        max-width: 800px;
      `}
    >
      <EnhancedTable />
    </Container>
  </div>
);

export default Main;
