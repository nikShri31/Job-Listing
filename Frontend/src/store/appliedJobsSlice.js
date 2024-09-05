import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAppliedJobs: [], //  applied jobs list
  userSelectedJobId: null, // For storing the job selected for viewing details
};
const appliedJobsSlice = createSlice({
  name: "appliedJobs",
  initialState,
  reducers: {
    setUserAppliedJobs: (state, action) => {
      const existingJob = state.userAppliedJobs.find(
        (job) => job.id === action.payload.id
      );
      if (!existingJob) {
        state.userAppliedJobs.push(action.payload);
      }
    },
    setUserSelectedJobId: (state, action) => {
      state.userSelectedJobId = action.payload;
    },
    clearUserSelectedJobId(state) {
      state.userSelectedJobId = null;
    },
  },
});
console.log(appliedJobsSlice);

export const { setUserAppliedJobs, setUserSelectedJobId, clearUserSelectedJobId } =
  appliedJobsSlice.actions;
export default appliedJobsSlice.reducer;
