import { DataContext } from "@/pages";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";

type Props = {};

function Preferences({}: Props) {
  const data = useContext(DataContext);

  const tickerRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    data?.checkboxes.setCheckboxes({
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      checkbox5: false,
    });
    data?.ticker.setTicker("");
  };

  const handleSources = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    data?.checkboxes.setCheckboxes({
      ...data.checkboxes.checkboxes,
      [name]: checked,
    });
    if (
      data?.preferences.preferences.sources.includes(event.target.value) ===
      true
    ) {
      const index = data?.preferences.preferences.sources.indexOf(
        event.target.value
      );
      data?.preferences.preferences.sources.splice(index, 1);
    } else {
      data?.preferences.setPreferences({
        sources: [...data.preferences.preferences.sources, event.target.value],
        tickers: [...data.preferences.preferences.tickers],
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-[250px]">
      <span className="font-medium text-lg">Select your preferences:</span>
      <div className="flex flex-col gap-6">
        <FormGroup className="flex flex-col gap-2">
          <span className="font-semibold">Source:</span>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  className="text-text-color"
                  value={"seekingalpha.com"}
                  name={"checkbox1"}
                  checked={data?.checkboxes?.checkboxes?.checkbox1}
                  onChange={handleSources}
                />
              }
              label="seekingalpha.com"
            />
            <FormControlLabel
              control={
                <Checkbox
                  className="text-text-color"
                  value={"dividend-growth-stocks.com"}
                  name={"checkbox2"}
                  checked={data?.checkboxes?.checkboxes?.checkbox2}
                  onChange={handleSources}
                />
              }
              label="dividend-growth-stocks.com"
            />
            <FormControlLabel
              control={
                <Checkbox
                  className="text-text-color"
                  value={"fool.com"}
                  name={"checkbox3"}
                  checked={data?.checkboxes?.checkboxes?.checkbox3}
                  onChange={handleSources}
                />
              }
              label="fool.com"
            />
            <FormControlLabel
              control={
                <Checkbox
                  className="text-text-color"
                  value={"marketwatch.com"}
                  name={"checkbox4"}
                  checked={data?.checkboxes?.checkboxes?.checkbox4}
                  onChange={handleSources}
                />
              }
              label="marketwatch.com"
            />
            <FormControlLabel
              control={
                <Checkbox
                  className="text-text-color"
                  value={"etftrends.com"}
                  name={"checkbox5"}
                  checked={data?.checkboxes?.checkboxes?.checkbox5}
                  onChange={handleSources}
                />
              }
              label="etftrends.com"
            />
          </div>
        </FormGroup>

        <span className="h-[1px] opacity-50 bg-gray-300 w-4/5 m-auto"></span>
        <div className="flex flex-col gap-4 w-full">
          <span className="font-semibold">Ticker symbols:</span>
          <TextField
            id="standard-basic"
            label="Ticker"
            variant="standard"
            ref={tickerRef}
            value={data?.ticker.ticker}
            onChange={(e) => data?.ticker.setTicker(e.target.value)}
            sx={{
              ".MuiFormLabel-root": { color: "var(--text-color)" },
              ".MuiInputBase-root::before": {
                borderBottomColor: "var(--text-color)",
              },
              ".MuiInputBase-root": { color: "var(--text-color)" },
            }}
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: "var(--text-color)",
              color: "var(--bg-color)",
              fontWeight: "600",
            }}
            onClick={() =>
              data?.preferences.setPreferences({
                sources: data.preferences.preferences.sources,
                tickers: [
                  ...data.preferences.preferences.tickers,
                  data.ticker.ticker,
                ],
              })
            }
          >
            ADD
          </Button>
        </div>
        <span className="h-[1px] opacity-50 bg-gray-300 w-4/5 m-auto"></span>
        <Button
          variant="contained"
          className="bg-red-600 font-semibold hover:bg-red-700"
          onClick={() => {
            handleReset();
            data?.preferences.setPreferences({
              sources: [],
              tickers: [],
            });
          }}
        >
          RESET
        </Button>
        <Button
          disabled={data?.isLoading}
          variant="contained"
          className="bg-blue-600 font-semibold hover:bg-blue-700"
          onClick={data?.refetch}
        >
          GET NEWS
        </Button>
      </div>
    </div>
  );
}

export default Preferences;
