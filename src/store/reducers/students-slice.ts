import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IStudents {
  open: boolean;
}

const initialState: IStudents = {
  open: false,
};

export const StudentsSlice = createSlice({
  name: "students slice",
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = StudentsSlice.actions;

export default StudentsSlice.reducer;
