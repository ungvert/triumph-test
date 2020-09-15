/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Box, Container, Typography, useTheme } from '@material-ui/core';
import { useState } from 'react';
import EnhancedTable from './Table/Table';
import {
  loadLocalStorageData,
  initialData,
  saveLocalStorageData,
} from '../utils/dataHandling';

const Main = () => {
  const localStorageData = loadLocalStorageData();

  const [data, setData] = useState(
    localStorageData ? localStorageData : initialData
  );

  const setDataMiddleware = (data: DataItem[]) => {
    saveLocalStorageData(data);
    setData(data);
  };

  const theme = useTheme();
  const styles = {
    tableWrapper: css`
      padding: 0;
      max-width: 860px;
      ${theme.breakpoints.up('sm')} {
        padding: 0 ${theme.spacing(3)}px;
      }
      ${theme.breakpoints.up('md')} {
        padding: 0 ${theme.spacing(5)}px;
      }
    `,
  };

  return (
    <div>
      <Container>
        <Box my={3}>
          <Typography variant="h3" align="center">
            Простой редактор табличных данных
          </Typography>
        </Box>
      </Container>
      <Container css={styles.tableWrapper}>
        <EnhancedTable data={data} setData={setDataMiddleware} />
      </Container>
    </div>
  );
};

export default Main;
