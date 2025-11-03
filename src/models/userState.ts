import { IUser } from "@/services/user/user.types";
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { getLocalInfo, setLocalInfo } from "../utils/syncLocal";

export interface ISubject {
  subject_code: string;
  subject_name: string;
  [key: number]: string;
}

export interface IUserState {
  user: IUser;
  subjectMap: ISubject[];
  currentRole: number;
}

const initialState: IUserState = {
  user: {
    userId: "",
    userName: "",
    userRoles: [],
    token: "",
    expiresTimeAt: 0,
  },
  currentRole: -1,
  subjectMap: [],
};

const userState = {
  namespace: "userState",
  state: initialState,
  reducers: {
    setUserInfo(state: IUserState, action: PayloadAction<IUser>) {
      const result = {
        ...state,
        user: action.payload,
      };
      setLocalInfo(userState.namespace, result);
      return result;
    },
    setSubjectMap(state: IUserState, action: PayloadAction<ISubject>) {
      const result = {
        ...state,
        subjectMap: action.payload,
      };
      setLocalInfo(userState.namespace, result);
      return result;
    },
    setCurrentRole(state: IUserState, action: PayloadAction<number>) {
      const result = {
        ...state,
        currentRole: action.payload,
      };
      setLocalInfo(userState.namespace, result);
      return result;
    },
    resetUser() {
      const result = {
        ...JSON.parse(JSON.stringify(initialState)),
      };
      setLocalInfo(userState.namespace, result);
      return result;
    },

    setAllUserInfo(state: IUserState, action: PayloadAction<IUserState>) {
      const result = action.payload;
      setLocalInfo(userState.namespace, result);
      return result;
    },
  },
  effects: {
    // 异步获取数据，提交到reducer
    // *asyncFun(action, {call, put}) {
    //   const data = yield call(request, 'api/users', {
    //     method: 'get'
    //   })
    //   yield put ({
    //     type: 'setUserInfo',
    //     payload: data
    //   })
    // }
  },
  subscriptions: {
    setup({ dispatch }: { dispatch: Dispatch }) {
      const result = getLocalInfo(
        userState.namespace,
        JSON.parse(JSON.stringify(initialState))
      );
      dispatch({
        type: "setAllUserInfo",
        payload: result,
      });
    },
  },
};
export default userState;
