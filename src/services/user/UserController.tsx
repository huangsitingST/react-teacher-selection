import request from "../request";
import { IUser, IExamineListParams } from "./user.types";
import { IActivityInfo } from "@/pages/teacherHome/type";

const API = {
  getUserToken: "v1/public/get/info/token/user",
  getSubjectList: "v1/other/subject/enum",
  getExamineList: "v1/activity/edb/review/list",
  getRateAward: "/v1/statistics/rate/award",
  getActivityInfo: "v1/activity/get/detail",
};

const getActivityInfo = async (params: {
  activity_id: string,
}): Promise<IActivityInfo> => {
  const response = await request.get(API.getActivityInfo, { params });
  const  {data} = response
  
  return {
    activity_id: data.activity_id,
    activity_name: data.activity_name,
    description: data.description,
    url: data.url,
    indicatorList: data.activity_one_indicators.map((item: any) => ({
      indicatorId: item.one_indicator_id,
      indicatorName: item.one_indicator_name,
      content: item.content,
      children: item.activity_two_indicators.map((child: any) => ({
        indicatorId: child.two_indicator_id,
        indicatorName: child.two_indicator_name,
        parentId: child.one_indicator_id,
        score: child.score,
      })),
    })),
  };
};

const getUserInfo = (userId?: string, token?: string) => {
  return new Promise<IUser>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        userId: "3698069230465524",
        userName: "舒加加",
        userRoles: [1, 2, 3, 4, 5],
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEYXRhSnNvbiI6ImV5Sm1jbTl0SWpvaU5qQXdNREF3SWl3aWRYTmxjbDlwWkNJNklqTTJPVGd3TmpreU16QTBOalUxTWpRaUxDSjFjMlZ5WDI1aGJXVWlPaUxvaUpMbGlxRGxpcUFpTENKMWMyVnlYM0p2YkdWeklqcGJORjE5IiwiZXhwIjoxNzYyNzQzODEyLCJpc3MiOiJ0ZWFjaGVycy1hd2FyZHMiLCJuYmYiOjE3NjIxMzgwMTJ9.7zwl53oKVQWmaRyXzb5g83vjAXaz1hzqOuqe0d5T1Nc',
        expiresTimeAt: 1761744972,
      });
    }, 1000);
  });
};

const getSubjectList = () => {
  return request.get(API.getSubjectList);
};

const getExamineList = (params: IExamineListParams) => {
  return request.get(API.getExamineList, { params });
};

const getRateAward = () => {
  return request.get(API.getRateAward, {
    params: {
      year: 2024,
    },
  });
};
export { getUserInfo, getSubjectList, getExamineList, getRateAward, getActivityInfo };
