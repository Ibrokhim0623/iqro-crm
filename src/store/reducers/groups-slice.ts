import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IGroupsSlice {
  groupModal: {
    open: boolean;
    groupId: number | null;
  };
}

const initialState: IGroupsSlice = {
  groupModal: {
    groupId: null,
    open: false,
  },
};

export const GroupsSlice = createSlice({
  name: "groups-slice",
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<IGroupsSlice["groupModal"]>) => {
      state.groupModal.open = action.payload.open;
      state.groupModal.groupId = action.payload.groupId;
    },
  },
});

export const { setOpen } = GroupsSlice.actions;
export default GroupsSlice.reducer;
