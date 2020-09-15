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
  initialColor: string;
};
export default function ColorPicker({ initialColor }: Props) {
  const [color, setColor] = useState<RGBColor | string>(initialColor);
  const [colorObject, setColorObject] = useState<ColorResult | undefined>(
    undefined
  );
  const theme = useTheme();

  function handleChange(e: ColorResult) {
    // console.log(e);
    setColor(e.rgb);
    setColorObject(e);
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
          value={colorObject ? colorObject.hex : color}
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
          span {
            font-size: ${theme.spacing(2)}px !important;
          }

          input {
            font-family: ${theme.typography.fontFamily};
            font-size: 13px !important;
          }
          .flexbox-fix {
            display: none !important;
          }
        `}
      />
      {/* <ChromePicker  color={color} onChange={handleChange} /> */}
      <Box my={3}>
        <SliderPicker color={color} onChange={handleChange} />
        {/* <HuePicker color={color} onChange={handleChange} /> */}
      </Box>
      {/* <Box my={1}>
        <AlphaPicker width={'100%'} color={color} onChange={handleChange} />
      </Box> */}

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
