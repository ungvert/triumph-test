/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Box, Container, Typography } from '@material-ui/core';
import { useState } from 'react';
import EnhancedTable from './EnhancedTable/EnhancedTable';

import { v4 as uuidv4 } from 'uuid';

const initialData = [
  { name: 'Grey1', type: 'main', color: '#f4f4f4' },
  { name: 'Grey2', type: 'side', color: '#f8f8f8' },
  { name: 'Tomato', type: 'side', color: '#ff6347' },
  { name: 'Cyan', type: 'side', color: '#00ffff' },
  { name: 'Blanchedalmond', type: 'side', color: '#ffebcd' },
].map((value) => {
  return { ...value, id: uuidv4() };
});

export const loadLocalStorageData = () => {
  try {
    const serializedData = localStorage.getItem('data');
    return serializedData === null ? undefined : JSON.parse(serializedData);
  } catch (err) {
    return undefined;
  }
};

export const saveLocalStorageData = (data: DataItem[]) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem('data', serializedData);
  } catch (err) {
    console.error('Не удалось сохранить данные');
  }
};

const Main = () => {
  const localStorageData = loadLocalStorageData();

  const [data, setData] = useState(
    localStorageData ? localStorageData : initialData
  );

  const setDataMiddleware = (data: DataItem[]) => {
    saveLocalStorageData(data);
    setData(data);
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
      <Container
        css={(theme) => css`
          padding: 0;
          max-width: 860px;
          ${theme.breakpoints.up('sm')} {
            padding: 0 ${theme.spacing(3)}px;
          }
          ${theme.breakpoints.up('md')} {
            padding: 0 ${theme.spacing(5)}px;
          }
        `}
      >
        <EnhancedTable data={data} setData={setDataMiddleware} />
      </Container>
    </div>
  );
};

export default Main;
