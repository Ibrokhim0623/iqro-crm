import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IStudents {
  studentModal: {
    studentId: number | null;
    open: boolean;
  };
}

const initialState: IStudents = {
  studentModal: {
    open: false,
    studentId: null,
  },
};

export const StudentsSlice = createSlice({
  name: "students slice",
  initialState,
  reducers: {
    setOpen: (
      state,
      action: PayloadAction<{ open: boolean; studentId: number | null }>
    ) => {
      state.studentModal.open = action.payload.open;
      state.studentModal.studentId = action.payload.studentId;
    },
  },
});

export const { setOpen } = StudentsSlice.actions;

export default StudentsSlice.reducer;
