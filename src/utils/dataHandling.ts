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

const loadLocalStorageData = () => {
  try {
    const serializedData = localStorage.getItem('data');
    return serializedData === null ? undefined : JSON.parse(serializedData);
  } catch (err) {
    return undefined;
  }
};

const saveLocalStorageData = (data: DataItem[]) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem('data', serializedData);
  } catch (err) {
    console.error('Не удалось сохранить данные');
  }
};

export { initialData, loadLocalStorageData, saveLocalStorageData };
