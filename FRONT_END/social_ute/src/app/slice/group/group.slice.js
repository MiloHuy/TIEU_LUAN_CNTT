import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({
  name: "group",
  initialState: {
    rolePermission: {},
    isRequest: false,
  },
  reducers: {
    getRolePermissionGroup: (state, action) => {
      state.rolePermission = Object.assign({}, action.payload);
    },
    getRequestJoinGroup: (state, action) => {
      state.isRequest = action.payload;
    }
  },
});

export const { getRolePermissionGroup,getRequestJoinGroup } = groupSlice.actions;

export const selectRolePermission = (state) => state.group.rolePermission;
export const selectIsRequest = (state) => state.group.isRequest;

export default groupSlice.reducer;
