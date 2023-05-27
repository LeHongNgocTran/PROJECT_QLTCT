import { createSlice } from '@reduxjs/toolkit';

const DataInvoice = createSlice({
  name: 'invoice',
  initialState: {
    data: {},
  },
  reducers: {
    SetData(state, actions) {
      state.data = actions.payload;
    },
    SetEmpty(state, actions) {
      state.data = {};
    },
  },
});

export const { SetData, SetEmpty } = DataInvoice.actions;

export default DataInvoice.reducer;
