import { Dispatch } from "@reduxjs/toolkit";
import { getLocalInfo, setLocalInfo } from "../utils/syncLocal";

export interface GlobalState {
  title: string;
  count: number;
}

const initialState: GlobalState = {
  title: "global",
  count: 0,
};

const globalState = {
  namespace: "globalState",
  state: initialState,
  reducers: {
    setTitle(state: GlobalState, action: { payload: string }) {
      setLocalInfo(globalState.namespace, {
        ...state,
        title: action.payload,
      });
      return {
        ...state,
        title: action.payload,
      };
    },
    setCount(state: GlobalState) {
      setLocalInfo(globalState.namespace, {
        ...state,
        count: state.count + 1,
      });
      return {
        ...state,
        count: state.count + 1,
      };
    },
  },
  effects: {
    *asyncGetGlobal(
      _action: any,
      {
        call,
        put,
      }: { call: (fn: () => Promise<void>) => void; put: (action: any) => void }
    ) {
      yield call(() => new Promise((res) => setTimeout(res, 1000)));

      const data = { title: "asyncGetGlobal", count: 100 };

      yield put({ type: "setTitle", payload: data.title });
      yield put({ type: "setCount", payload: data.count });
    },
  },
  subscriptions: {
    setup({ dispatch }: { dispatch: Dispatch }) {
      const ls = getLocalInfo(globalState.namespace, initialState) as GlobalState;
      dispatch({ type: "setTitle", payload: ls.title });
      dispatch({ type: "setCount", payload: ls.count });
    },
  },
};

export default globalState;
