import { getFullName } from "utils/user.utils";
import CellHeaderAllMembersGroup, { CellAction } from "./Cell";

export const columns = [
  {
    accessorKey: "name",
    header: CellHeaderAllMembersGroup,
    cell: ({ row }) =>
      getFullName(
        row.original.user_id.first_name,
        row.original.user_id.last_name
      ),
  },
  {
    accessorKey: "department",
    header: CellHeaderAllMembersGroup,
    cell: ({ row }) => row.original.user_id.department,
  },
  {
    accessorKey: "post_count",
    header: CellHeaderAllMembersGroup,
  },
  {
    accessorKey: "like_count",
    header: CellHeaderAllMembersGroup,
  },
  {
    accessorKey: "cmt_count",
    header: CellHeaderAllMembersGroup,
  },
  {
    accessorKey: "actions",
    header: CellHeaderAllMembersGroup,
    cell: CellAction,
  },
];
