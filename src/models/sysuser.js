import { sysUserList } from '../services/user';

export default {
  namespace: 'sysuser',
  state: {
    list: [],
  },
  effects: {
    *list({ payload }, { call, put }) {
      const { searchKey } = payload;
      const response = yield call(sysUserList, searchKey);
      yield put({
        type: 'saveList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
