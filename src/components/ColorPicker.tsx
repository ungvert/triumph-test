/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import {
  SketchPicker,
  ColorResult,
  RGBColor,
  SliderPicker,
  AlphaPicker,
  HuePicker,
  PhotoshopPicker,
  ChromePicker,
} from 'react-color';
type Props = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};
export default function ColorPicker({ color, setColor }: Props) {
  const theme = useTheme();

  function handleChange(e: ColorResult) {
    setColor(e.hex);
  }
  return (
    <div>
      <Box>
        <TextField
          label="Color"
          variant="outlined"
          size="small"
          margin="dense"
          type="text"
          disabled
          value={color}
        />
      </Box>
      <SketchPicker
        color={color}
        onChange={handleChange}
        presetColors={[]}
        width={'100%'}
        css={css`
          box-sizing: border-box !important ;
          padding: 0 !important ;
          .flexbox-fix {
            display: none !important;
          }
        `}
      />
      <Box my={3}>
        <SliderPicker color={color} onChange={handleChange} />
      </Box>

      <Box
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        {/* <TextField
          label="R"
          variant="outlined"
          size="small"
          disabled
          margin="dense"
          value={color?.r}
        />
        <TextField
          label="G"
          variant="outlined"
          size="small"
          disabled
          margin="dense"
          value={color?.g}
        />

        <TextField
          label="B"
          variant="outlined"
          size="small"
          disabled
          margin="dense"
          value={color?.b}
        />

        <TextField
          label="Alpha"
          variant="outlined"
          size="small"
          disabled
          margin="dense"
          value={color?.a}
        /> */}
      </Box>
    </div>
  );
}
