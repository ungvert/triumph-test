/// <reference types="react-scripts" />

type DataItem = {
  name: string;
  type: string;
  color: string;
  id: string;
};

type SetData = Dispatch<
  SetStateAction<
    {
      name: string;
      type: string;
      color: string;
      id: string;
    }[]
  >
>;
