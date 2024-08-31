import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
};

const appliedJobsSlice = createSlice({
  name: 'appliedJobs',
  initialState,
  reducers: {
    applyJob: (state, action) => {
      state.jobs.push(action.payload);
    },
  },
});
console.log(appliedJobsSlice);


export const { applyJob } = appliedJobsSlice.actions;
export default appliedJobsSlice.reducer;
