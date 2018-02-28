import { routerRedux } from 'dva/router';
import { fakeAccountLogin, accLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *tokenLogin({ payload }, { call, put }) {
      const response = yield call(accLogin, payload);
      yield put({
        type: 'changeLoginToken',
        payload: response,
      });
      // Login successfully
      if (response.token) {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
    *login({ payload }, { call, put }) {
      const response = yield call(accLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },

    changeLoginToken(state, { payload }) {
      setAuthority(payload.token);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      }
    },
  },
};
