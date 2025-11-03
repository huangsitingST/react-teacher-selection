export interface IUser {
  userId: string;
  userName: string;
  userRoles: number[];
  token: string;
  expiresTimeAt: number;
}
export interface IExamineListParams {
  page: number;
  limit: number;

  school_id: string;
  status: number;
  
  user_name?: string;
  subject_code?: string;
  user_sex?: number;
}
