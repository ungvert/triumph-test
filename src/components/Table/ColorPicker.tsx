/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { SketchPicker, ColorResult, SliderPicker } from 'react-color';

type Props = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};
export default function ColorPicker({ color, setColor }: Props) {
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
    </div>
  );
}
