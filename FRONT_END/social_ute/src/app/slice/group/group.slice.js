import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({
  name: "group",
  initialState: {
    rolePermission: {},
  },
  reducers: {
    getRolePermissionGroup: (state, action) => {
      state.rolePermission = Object.assign({}, action.payload);
    },
  },
});

export const { getRolePermissionGroup } = groupSlice.actions;

export const selectRolePermission = (state) => state.group.rolePermission;

export default groupSlice.reducer;
