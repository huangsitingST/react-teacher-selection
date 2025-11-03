export enum RoleEnum {
  "教师" = 4, // 教师
  "学校" = 1, // 学校
  "教育局" = 3, // 教育局
  "专家" = 2, // 专家
  "超级管理员" = 5, // 超级管理员
}

export const MenuList = [
  {
    key: "/workbench/teacherHome",
    label: "申报",
    title: "申报",
    role: [RoleEnum.教师],
  },
  {
    key: "/workbench/workStorage",
    label: "工作台",
    title: "工作台",
    role: [RoleEnum.学校, RoleEnum.教育局, RoleEnum.专家],
  },
  {
    key: "/workbench/examine",
    label: "审核管理",
    title: "审核管理",
    role: [RoleEnum.学校, RoleEnum.教育局, RoleEnum.专家],
  },
  {
    key: "summaryIndex",
    label: "历年申报总表",
    title: "历年申报总表",
    role: [RoleEnum.学校, RoleEnum.教育局],
  },
  {
    key: "noticeManageList",
    label: "公告管理",
    title: "公告管理",
    role: [RoleEnum.教育局],
  },
  {
    key: "activityIndex",
    label: "活动管理",
    title: "活动管理",
    role: [RoleEnum.教育局],
  },
  {
    key: "target",
    label: "指标库",
    title: "指标库",
    role: [RoleEnum.教育局],
  },
  {
    key: "empower",
    label: "授权管理",
    title: "授权管理",
    role: [RoleEnum.教育局],
  },
  {
    key: "role",
    label: "角色管理",
    title: "角色管理",
    role: [RoleEnum.超级管理员],
  },
];
