import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import DateFormat from './DateFormat';

export default function BasicDatePicker({ label, inputRef, disableFuture, usarDataAtual, dataInserida }) {
  // console.log(DateFormat(dataInserida))
  const [value, setValue] = React.useState(usarDataAtual ? dayjs() : DateFormat(dataInserida));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        inputFormat='DD/MM/YYYY'
        value={value}
        disableFuture={disableFuture}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        inputRef={inputRef}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
