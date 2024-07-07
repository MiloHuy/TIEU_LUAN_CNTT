import GroupDetailProvider from "layout/group-detail-provider/GroupDetailProvider";
import StatisticLayout from "layout/statistic-layout";
import NotFound from "pages/404-not_found/NotFound";
import PostDetail from "pages/[...post_id]/PostDetail";
import Admin from "pages/admin";
import GroupDetail from "pages/group/[...code-group]";
import AllGroup from "pages/group/all";
import CreateGroup from "pages/group/create";
import HomeGuests from "pages/home-guests";
import HomeUser from "pages/home-user";
import About from "pages/main/About";
import Home from "pages/main/Home";
import Report from "pages/main/Report";
import ManageAccount from "pages/manage/manage-account";
import ManagePosts from "pages/manage/manage-posts";
import StatisticalMonth from "pages/manage/statistical/statistical-month";
import StatiscalMonthDetails from "pages/manage/statistical/statistical-month-details";
import StatisticalSystems from "pages/manage/statistical/statistical-systems";
import RequestFriend from "pages/request-friend";
import User from "pages/user";
import "./App.css";
import ManageGroup from "pages/group/manage-group";
import ManageMembers from "pages/group/manage-members";
import ManageRequestJoin from "pages/group/mange-request-join/ManageRequestJoin";
import ManagePostsGroup from "pages/group/manage-posts/ManagePostsGroup";
import ManageApprovePost from "pages/group/manage-approve-post";
import ManagePostsReport from "pages/group/manage-posts-report";

export const mainRoutes = [
  { path: "/home", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/report", element: <Report /> },
];

export const groupChildRoutes = [
  { path: "groupDetails/:groupId", element: <GroupDetail /> },
  { path:  "manageGroup/:groupId", element: <ManageGroup/>},
  { path : "manageGroup/allMembers/:groupId", element: <ManageMembers/>},
  { path : "manageGroup/allRequestJoin/:groupId",element: <ManageRequestJoin/>},
  { path: 'manageGroup/allPosts/:groupId', element: <ManagePostsGroup/>},
  { path : 'manageGroup/allPostWaitApprove/:groupId', element: <ManageApprovePost/>},
  { path : 'manageGroup/allReportPosts/:groupId', element: <ManagePostsReport/>},
];

export const userRoutes = [
  { path: "", element: <User /> },
  { path: "home-user/:userId", element: <HomeUser /> },
  { path: "home-guest/:guestId", element: <HomeGuests /> },
  { path: "post/:postId/", element: <PostDetail /> },
  { path: "*", element: <NotFound /> },
  { path: "request-friend", element: <RequestFriend /> },
  { path: "create-group", element: <CreateGroup /> },
  { path: "all-group", element: <AllGroup /> },
  { element: <GroupDetailProvider />, children: groupChildRoutes },
];

export const adminRoutes = [
  { path: "manage", element: <Admin /> },
  { path: "accounts", element: <ManageAccount /> },
  { path: "posts", element: <ManagePosts /> },
  {
    path: "statistics",
    element: <StatisticLayout />,
    children: [
      { element: <StatisticalSystems /> },
      { path: "month", element: <StatisticalMonth /> },
      { path: "month-details", element: <StatiscalMonthDetails /> },
    ],
  },
];
