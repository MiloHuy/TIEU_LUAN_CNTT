import { catePermiss } from "constants/group/permission.const";

export const ARRAY_SIDEBAR_MANAGE_GROUP = [
  {
    manage: "manageMember",
    main: {
      category: catePermiss.MANAGE_MEMBER,
      name: "Quản lý thành viên",
    },
    childs: [
      {
        action: "allMember",
        name: "Tất cả thành viên",
      },
      {
        action: "allRequestJoin",
        name: "Yêu cầu",
      }
    ]
  },
  {
    manage: "managePost",
    main: {
      category: catePermiss.MANAGE_POST,
      name: "Quản lý bài viết",
    },
    childs: [
      {
        action: "allPosts",
        name: "Tất cả bài viết",
      },
      {
        action: "allPostWaitApprove",
        name: "Yêu cầu",
      },
      {
        action: "allReportPosts",
        name: "Báo cáo",
      }
    ]
  },
  {
    manage: "manageInteract",
    main: {
      category: catePermiss.MANAGE_INTERACT,
      name: "Quản lý tương tác",
    },
    childs: [
      {
        action: "statisticMember",
        name: "Thống kê",
      }
    ]
  },
  {
    manage: "manageRegulation",
    main: {
      category: catePermiss.MANAGE_REGULATION,
      name: "Quản lý nội quy",
    },
    childs: [
      {
        action: "editContent",
        name: "Nội dung",
      }
    ]
  },
]
