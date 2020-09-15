/// <reference types="react-scripts" />

type DataItem = {
  name: string;
  type: string;
  color: string;
};

type SetData = Dispatch<
  SetStateAction<
    {
      name: string;
      type: string;
      color: string;
    }[]
  >
>;
