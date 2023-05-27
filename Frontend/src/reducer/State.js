import { createSlice } from '@reduxjs/toolkit';

const stateTuyenTauSlice = createSlice({
  name: 'stateTuyenTau',
  initialState: {
    state: false,
  },
  reducers: {
    setStateTuyenTau(state, actions) {
      state.state = actions.payload;
    },
  },
});

export const { setStateTuyenTau } = stateTuyenTauSlice.actions;
export default stateTuyenTauSlice.reducer;
