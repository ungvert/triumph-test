/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Box, Container, Typography } from '@material-ui/core';
import { useState } from 'react';
import EnhancedTable from './EnhancedTable/EnhancedTable';

const Main = () => {
  const initialData = [
    { name: 'Grey1', type: 'main', color: '#f4f4f4' },
    { name: 'Grey2', type: 'side', color: '#f8f8f8' },
    { name: 'Tomato', type: 'side', color: '#ff6347' },
  ];

  const [data, setData] = useState(initialData);
  return (
    <div>
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
        <EnhancedTable data={data} setData={setData} />
      </Container>
    </div>
  );
};

export default Main;
