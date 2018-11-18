export default {
  namespace: "navigatorAdmin",

  state: {
    buyerShow: true,
    sellerShow: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    clear(state) {
      return {
        ...state,
        ...{
          buyerShow: false,
          sellerShow: false
        }
      };
    }
  }
};
