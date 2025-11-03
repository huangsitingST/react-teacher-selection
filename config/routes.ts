import { RoleEnum } from "../src/utils/constants";

export default [
  { path: "/", redirect: "/auth" },
  { path: "/auth", component: "auth", layout: false },

  { path: "/401", component: "status/401", layout: false },

  {
    path: "/choiceAccess",
    component: "choiceAccess",
    // layout: false,
    wrappers: ["@/wrappers/auth"],
  },
  {
    path: "/apply",
    component: "@/pages/teacherHome/apply",
    layout: false,
    wrappers: ["@/wrappers/auth"],
    meta: {
      roleList: [RoleEnum.教师],
    },
  },

  {
    path: "/workbench",
    wrappers: ["@/wrappers/auth"],
    component: "layouts/index",
    name: '工作台',
    meta: {
      roleList: [RoleEnum.专家, RoleEnum.学校, RoleEnum.教育局],
    },
    routes: [
      {
        path: "",
        redirect: "workStorage",
      },
      {
        path: "workStorage",
        component: "@/pages/workStorage/index",
        meta: {
          roleList: [RoleEnum.专家, RoleEnum.学校, RoleEnum.教育局],
        },
      },
      {
        path: "teacherHome",
        name: "申请",
        component: "@/pages/teacherHome/index",
        meta: {
          roleList: [RoleEnum.教师],
        },
      },
      {
        path: "examine",
        name: '审核管理',
        meta: {
          roleList: [RoleEnum.专家, RoleEnum.学校, RoleEnum.教育局],
        },
        routes: [
          {
            path: "",
            redirect: "examList",
          },
          {
            path: "examList",
            component: "@/pages/examine/index",
            meta: {
              roleList: [RoleEnum.专家, RoleEnum.学校, RoleEnum.教育局],
            },
          },
          {
            path: "examDetail",
            name: "审核详情",
            component: "@/pages/examine/ExamDetail",
            meta: {
              roleList: [RoleEnum.专家, RoleEnum.学校, RoleEnum.教育局],
            },
          },
        ],
      },
    ],
  },
  { path: "/401", component: "status/401", layout: false },
  { path: "/403", component: "status/403", layout: false },
  { path: "/*", component: "status/404", layout: false },
];
