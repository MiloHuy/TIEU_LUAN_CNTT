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
        path : "allMembers"
      },
      {
        action: "allRequestJoin",
        name: "Yêu cầu",
        path: "allRequestJoin"
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
        path: "allPosts"
      },
      {
        action: "allPostWaitApprove",
        name: "Yêu cầu",
        path: "allPostWaitApprove"
      },
      {
        action: "allReportPosts",
        name: "Báo cáo",
        path: "allReportPosts"
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
        path: "statisticMember"
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
        action : "editContent",
        name : "Nội dung",
        path : "editContent"
      }
    ]
  },
]
