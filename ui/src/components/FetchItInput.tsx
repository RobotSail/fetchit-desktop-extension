import React from "react";
import { styles, colors } from "../style";
import {
  TextField,
  Radio,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Box,
} from "@mui/material";
import CodeTextArea from "@uiw/react-textarea-code-editor";
import type { FetchItConfigMethod } from "../types";
type FetchItInputProps = {
  onCodeAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  codeAreaValue: string;
  fetchItConfigType: FetchItConfigMethod;
  onFetchItConfigTypeChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onURLChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  fetchItConfigURL: string;
  disabled?: boolean;
};

const FetchItInput: React.FC<FetchItInputProps> = (
  props: FetchItInputProps,
) => {
  const {
    onCodeAreaChange,
    codeAreaValue,
    onFetchItConfigTypeChange,
    fetchItConfigType,
    onURLChange,
    fetchItConfigURL,
    disabled,
  } = props;

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <FormControl>
        <FormLabel
          sx={styles.typeographySecondary}
          id="demo-radio-buttons-group-label"
        >
          Config Type
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={fetchItConfigType}
          onChange={onFetchItConfigTypeChange}
        >
          <FormControlLabel
            value="url"
            sx={styles.typeographySecondary}
            control={
              <Radio
                sx={{
                  "&, &.Mui-checked": {
                    color: "#8c4afd",
                  },
                }}
              />
            }
            label="URL"
            // color="#8c4afd"
          />
          <FormControlLabel
            value="manual"
            control={
              <Radio
                sx={{
                  "&, &.Mui-checked": {
                    color: "#8c4afd",
                  },
                }}
              />
            }
            label="Manual Config"
            sx={styles.typeographySecondary}
            // color="#8c4afd"
          />
        </RadioGroup>
      </FormControl>
      <Box
        sx={{
          marginTop: 2,
          width: "100%",
          minWidth: "100%",
        }}
      >
        {fetchItConfigType === "manual" ? (
          <CodeTextArea
            value={codeAreaValue}
            language="yaml"
            placeholder="Enter your FetchIt config here."
            padding={15}
            onChange={onCodeAreaChange}
            style={styles.codeEditor}
            disabled={disabled}
          />
        ) : (
          <TextField
            fullWidth
            label="URL"
            id="fetchItConfigURL"
            sx={{
              input: {
                color: "white",
                backgroundColor: colors.backgroundSecondary,
                borderColor: colors.borderColor,
                borderWidth: "1px",
              },
            }}
            onChange={onURLChange}
            value={fetchItConfigURL}
            disabled={disabled}
          />
        )}
      </Box>
    </Box>
  );
};

export default FetchItInput;
